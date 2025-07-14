import { IsLessThan } from "inferred-types/types";

/**
 * **isLessThan**`(comparator) -> (val) -> boolean`
 *
 * Creates a type strong comparison as to whether the value `TVal` is
 * less than the _comparator_ value.
 */
export function isLessThan<T extends number>(comparator: T) {
    return <TVal extends number>(val: TVal) => {
        return val < comparator as IsLessThan<TVal,T>;
    }
}
