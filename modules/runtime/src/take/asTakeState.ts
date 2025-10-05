import type { AsTakeState, TakeState } from "inferred-types/types";
import { Never } from "inferred-types/constants";
import { isString, isTakeState } from "inferred-types/runtime";

/**
 * **asTakeState**`(take)`
 *
 *
 */
export function asTakeState<T extends string | TakeState>(take: T): AsTakeState<T> {
    return isTakeState(take)
        ? take as unknown as AsTakeState<T>
        : isString(take)
            ? {
                kind: "TakeState",
                parsed: [],
                parseString: take,
                tokens: []
            } as AsTakeState<T>
            : Never;
}
