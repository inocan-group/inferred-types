import type { IsGreaterThan } from "inferred-types/types";

/**
 * **isGreaterThan**`(comparator) -> (val) -> boolean`
 *
 * Creates a type strong comparison as to whether the value `TVal` is
 * greater than the _comparator_ value.
 */
export function isGreaterThan<T extends number>(comparator: T) {
    return <TVal extends number>(val: TVal) => {
        return val > comparator as IsGreaterThan<TVal, T>;
    };
}
