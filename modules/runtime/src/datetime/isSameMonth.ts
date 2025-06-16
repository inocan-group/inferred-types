import type { DateLike, IsSameMonth } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

/**
 * **isSameMonth**`(comparator) -> (date) -> boolean
 *
 * Higher order utility to configure a date checking function which
 * checks whether an incoming `date` is in the same **month** _and_
 * **year** as the _comparator_ date.
 *
 * **Related:**
 * - `isBefore`, `isAfter`, `isSameDay`, `isSameMonthYear`, `isSameYear`
 * - `isLeapYear`, `isSummer`, `isWinter`, `isFall`, `isSpring`
 */
export function isSameMonth<
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
        ) as IsSameMonth<TVal, TComparator>;
    };
}
