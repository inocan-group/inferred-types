import type { DateLike, IsAfter } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

/**
 * **isAfter**`(comparator) -> (date) -> boolean
 *
 * Higher order utility to configure a date checking function which
 * checks whether an incoming `date` is _after_ the configured date.
 *
 * **Related:** `isBefore`, `isLeapYear`, `isSameYear`, `isSameDay`
 */
export function isAfter<
    TComparator extends DateLike
>(comparator: TComparator) {
    const comp = asDate(comparator);

    return <TVal extends DateLike>(
        val: TVal
    ) => {
        const v = asDate(val);
        return v.getTime() > comp.getTime() as unknown as IsAfter<TVal, TComparator>;
    };
}
