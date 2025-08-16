import type { DateLike, IsDoubleLeap } from "inferred-types/types";
import { DOUBLE_LEAP_MODERN } from "inferred-types/constants";
import { asDate } from "inferred-types/runtime";

/**
 * **isDoubleLeap**`(val)`
 *
 * Determines if the passed in date/year is a "Double Leap" year.
 *
 * - a double leap year is a leap year that also appears in the DOUBLE_LEAP_MODERN constant
 * - attempts to resolve this to `true`/`false` at design time when literal values are passed in
 * - for runtime values, it will check against the DOUBLE_LEAP_MODERN array
 *
 * **Related:** `IsDoubleLeap` type utility
 */
export function isDoubleLeap<T extends DateLike>(val: T): IsDoubleLeap<T> {
    const year = asDate(val)?.getUTCFullYear();
    if (!year) {
        throw new Error(`Invalid date passed into isDoubleLeap(${String(val)})`);
    }

    // Check if the year is in the DOUBLE_LEAP_MODERN array
    return DOUBLE_LEAP_MODERN.includes(year) as IsDoubleLeap<T>;
}
