import type { IsBetweenExclusively, IsBetweenInclusively } from "inferred-types/types";

export type BetweenScope = "exclusively" | "inclusively";

/**
 * **between**`(from, to, [scope]) -> (val) -> boolean`
 *
 * A higher-order function which builds boolean logic for
 * whether a numeric value passed in is _between_ the two
 * constraints established on the first call.
 */
export function between<
    TMin extends number,
    TMax extends number,
    TScope extends BetweenScope = "exclusively"
>(
    min: TMin,
    max: TMax,
    scope: TScope = "exclusively" as TScope
) {
    return <TVal extends number>(val: TVal) => {
        return (
            scope === "inclusively"
                ? val > min && val < max
                : val >= min && val <= max
        ) as TScope extends "inclusively"
            ? IsBetweenInclusively<TVal, TMin, TMax>
            : TScope extends "exclusively"
                ? IsBetweenExclusively<TVal, TMin, TMax>
                : never;
    };
}
