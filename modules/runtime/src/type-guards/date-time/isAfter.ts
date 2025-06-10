import { DateLike } from "inferred-types/types";
import { toDate, isDateLike } from "inferred-types/runtime";

/**
 * **isAfter**`(comparator) -> (value) -> boolean`
 *
 * A higher order type guard which takes a `DateLike` value
 * for comparison first. Then it accepts any value an if that
 * value is `DateLike` it will be compared to see if it is
 * _after_ the comparator.
 */
export function isAfter(
    comparator: DateLike
) {
    return (val: unknown): val is DateLike => {

        return isDateLike(val)
            && toDate(comparator).toISOString() < toDate(val).toISOString()
    }
}
