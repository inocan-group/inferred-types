import type { DateLike, IsSameYear } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

/**
 * **isSameYear**`(comparator) -> (date) -> boolean
 *
 * Higher order utility to configure a date checking function which
 * checks whether an incoming `date` is in the same year as the
 * _comparator_ date.
 *
 * **Related:** `isBefore`, , `isAfter`, `isLeapYear`, `isSameDay`
 */
export function isSameYear<
    TComparator extends DateLike
>(comparator: TComparator) {
    const comp = asDate(comparator);

    return <TVal extends DateLike>(
        val: TVal
    ) => {
        const v = asDate(val);
        return (
            v.getUTCFullYear() === comp.getUTCFullYear()
        ) as IsSameYear<TVal, TComparator>;
    };
}
