import type { DateLike, IsAfter } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

/**
 * Checks if a value is a year-only number (e.g., 2023).
 */
function isYearOnly(input: unknown): input is number {
    return (
        typeof input === "number"
        && Number.isInteger(input)
        && input >= 1000
        && input <= 9999
    );
}

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
    return <TVal extends DateLike>(
        val: TVal
    ): IsAfter<TVal, TComparator> => {
        // Handle year-only number comparison
        if (isYearOnly(comparator) && isYearOnly(val)) {
            return (val > comparator) as IsAfter<TVal, TComparator>;
        }
        // Fallback to date comparison
        const comp = asDate(comparator);
        const v = asDate(val);
        return (v.getTime() > comp.getTime()) as IsAfter<TVal, TComparator>;
    };
}
