import { asDate } from "runtime/datetime";
import { err } from "runtime/errors";
import { isDateLike } from "runtime/type-guards";

/**
 * **isThisMonth**`(input, now?)`
 *
 * Returns `true` if the given date-like input falls within the current month, `false` otherwise.
 * - Accepts the same input types as other datetime functions.
 * - Compares both year and month for accurate results.
 * - Throws an error for invalid inputs.
 * - Optional `now` parameter for testing purposes
 */
export function isThisMonth(
    input: string | number | Record<string, any> | Date,
    now: Date = new Date()
): boolean {
    if (isDateLike(input)) {
        const date = asDate(input);

        // Compare year and month using UTC methods since asDate returns UTC dates
        const inputYear = date.getUTCFullYear();
        const inputMonth = date.getUTCMonth();

        // Convert now to UTC for comparison
        const nowUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
        const nowYear = nowUtc.getUTCFullYear();
        const nowMonth = nowUtc.getUTCMonth();

        return inputYear === nowYear && inputMonth === nowMonth;
    }
    else {
        throw err("invalid-date", `The isThisMonth(input) function received a value which could not be converted to a date!`, { input, now });
    }
}
