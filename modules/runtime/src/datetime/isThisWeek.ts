import type { DateLike } from "inferred-types/types";
import { asDate, getWeekNumber } from "runtime/datetime";

/**
 * **isThisWeek**`(input, now?)`
 *
 * Returns `true` if the given date-like input falls within the current ISO week (Monday start), `false` otherwise.
 * - Accepts the same input types as other datetime functions.
 * - Uses ISO 8601 week definition (Monday as the first day of the week).
 * - Throws an error for invalid inputs.
 * - Optional `now` parameter for testing purposes
 */
export function isThisWeek(
    input: DateLike,
    now: Date = new Date()
): boolean {
    const date = asDate(input);

    // Compare ISO week number and year
    const inputWeek = getWeekNumber(date);
    const nowWeek = getWeekNumber(now);

    // Handle ISO week 1 that may belong to previous/next year
    // Use the Thursday of the week to determine the ISO year
    const getIsoWeekYear = (d: Date) => {
        const thursday = new Date(d);
        thursday.setDate(d.getDate() + 4 - (d.getDay() || 7));
        return thursday.getFullYear();
    };

    return (
        inputWeek === nowWeek
        && getIsoWeekYear(date) === getIsoWeekYear(now)
    );
}
