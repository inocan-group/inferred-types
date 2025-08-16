import type { LessThan } from "inferred-types/types";

/**
 * **lessThan**`(comparator) -> (val) -> boolean`
 *
 * Creates a type strong comparison as to whether the value `TVal` is
 * less than the _comparator_ value.
 */
export function lessThan<T extends number>(comparator: T) {
    return <TVal extends number>(val: TVal) => {
        return val < comparator as LessThan<TVal, T>;
    };
}
