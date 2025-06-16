import type { DateLike, IsSameDay } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

/**
 * **isSameDay**`(comparator) -> (date) -> boolean
 *
 * Higher order utility to configure a date checking function which
 * checks whether an incoming `date` is on the same day as the _comparator_
 * date..
 *
 * **Related:** `isBefore`, , `isAfter`, `isLeapYear`, `isSameYear`
 */
export function isSameDay<
    TComparator extends DateLike
>(comparator: TComparator) {
    const comp = asDate(comparator);

    return <TVal extends DateLike>(
        val: TVal
    ) => {
        const v = asDate(val);
        return (
            v.getDate() === comp.getDate()
            && v.getMonth() === comp.getMonth()
            && v.getFullYear() === comp.getFullYear()
        ) as IsSameDay<TVal, TComparator>;
    };
}
