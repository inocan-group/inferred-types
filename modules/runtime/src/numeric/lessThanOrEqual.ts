import { LessThanOrEqual } from "inferred-types/types";

/**
 * **lessThanOrEqual**`(comparator) -> (val) -> boolean`
 *
 * Creates a type strong comparison as to whether the value `TVal` is
 * less than or equal to the _comparator_ value.
 */
export function lessThanOrEqual<T extends number>(comparator: T) {
    return <TVal extends number>(val: TVal) => {
        return val <= comparator as LessThanOrEqual<TVal,T>;
    }
}