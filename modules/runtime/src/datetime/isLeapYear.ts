import type { IsLeapYear, DateLike } from "inferred-types/types";
import { asDate } from "inferred-types/runtime";

/**
 * Determines in the passed in date/year is a _leap year_.
 *
 * - a leap year is a year divisible by 4 but not by 100
 * (unless also divisible by 400)
 */
export function isLeapYear<T extends DateLike>(val: T): IsLeapYear<T> {
    const year = asDate(val)?.getUTCFullYear();
    if (!year) {
        throw new Error(`Invalid date passed into isLeapYear(${String(val)})`);
    }

    return (
        year % 100 === 0
            ? year % 400 === 0
            : year % 4 === 0
    ) as IsLeapYear<T>;
}

