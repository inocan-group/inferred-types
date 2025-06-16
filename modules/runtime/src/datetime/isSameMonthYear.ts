import type { DateLike, IsSameMonthYear } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

/**
 * **isSameMonthYear**`(comparator) -> (date) -> boolean
 *
 * Higher order utility to configure a date checking function which
 * checks whether an incoming `date` is in the same **month** _and_
 * **year** as the _comparator_ date.
 *
 * **Related:** `isBefore`, , `isAfter`, `isLeapYear`, `isSameDay`
 */
export function isSameMonthYear<
    TComparator extends DateLike
>(comparator: TComparator) {
    const comp = asDate(comparator);

    return <TVal extends DateLike>(
        val: TVal
    ) => {
        const v = asDate(val);
        return (
            v.getFullYear() === comp.getFullYear()
            && v.getMonth() === comp.getMonth()
        ) as IsSameMonthYear<TVal, TComparator>;
    };
}
