import type { IsGreaterThanOrEqual } from "@inferred-types/types";

/**
 * **isGreaterThanOrEqual**`(comparator) -> (val) -> boolean`
 *
 * Creates a type strong comparison as to whether the value `TVal` is
 * greater than _or equal_ to the _comparator_ value.
 */
export function isGreaterThanOrEqual<T extends number>(comparator: T) {
    return <TVal extends number>(val: TVal) => {
        return val >= comparator as IsGreaterThanOrEqual<TVal, T>;
    };
}
