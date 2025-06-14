import { asDate } from "inferred-types/runtime";
import {  DateLike, IsBefore } from "inferred-types/types";

/**
 * **isBefore**`(comparator) -> (date) -> boolean
 *
 * Higher order utility to configure a date checking function which
 * checks whether an incoming `date` is _before_ the configured date.
 *
 * **Related:** `isBefore`, `isLeapYear`, `isSameYear`, `isSameDay`
 */
export function isBefore<
    TComparator extends DateLike
>(comparator: TComparator) {
    const comp = asDate(comparator);

    return <TVal extends DateLike>(
        val: TVal
    ) => {
        const v = asDate(val);
        return v.getTime() < comp.getTime() as IsBefore<TVal,TComparator>;
    }
}
