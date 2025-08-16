import type { IsLessThanOrEqual } from "inferred-types/types";

/**
 * **isLessThanOrEqual**`(comparator) -> (val) -> boolean`
 *
 * Creates a type strong comparison as to whether the value `TVal` is
 * less _or equal to_ the **comparator** value.
 */
export function isLessThanOrEqual<T extends number>(comparator: T) {
    return <TVal extends number>(val: TVal) => {
        return val <= comparator as IsLessThanOrEqual<TVal, T>;
    };
}
