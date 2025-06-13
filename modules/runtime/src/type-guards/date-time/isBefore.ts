import type { DateLike } from "inferred-types/types";
import { isDateLike, toDate } from "inferred-types/runtime";

/**
 * **isBefore**`(comparator) -> (value) -> boolean`
 *
 * A higher order type guard which takes a `DateLike` value
 * for comparison first. Then it accepts any value an if that
 * value is `DateLike` it will be compared to see if it is
 * _before_ the comparator.
 */
export function isBefore(
    comparator: DateLike
) {
    return (val: unknown): val is DateLike => {
        return isDateLike(val)
            && toDate(comparator).toISOString() > toDate(val).toISOString();
    };
}
