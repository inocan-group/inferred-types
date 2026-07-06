import type { IsLessThan } from "inferred-types/types";

/**
 * **isLessThan**`(comparator) -> (val) -> boolean`
 *
 * Creates a type strong comparison as to whether the value `TVal` is
 * less than the _comparator_ value.
 */
export function isLessThan<T extends number>(comparator: T): <TVal extends number>(val: TVal) => IsLessThan<TVal, T> {
    return <TVal extends number>(val: TVal) => {
        return val < comparator as IsLessThan<TVal, T>;
    };
}
