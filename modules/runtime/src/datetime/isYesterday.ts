import { DateLike } from "inferred-types/types";
import { asDate, getYesterday } from "runtime/datetime";

/**
 * **isYesterday**`(input, now?)`
 *
 * Returns `true` if the given date-like input represents yesterday's date, `false` otherwise.
 * - Accepts the same input types as other datetime functions.
 * - Compares only the date part, ignoring time.
 * - Throws an error for invalid inputs.
 * - Optional `now` parameter for testing purposes
 */
export function isYesterday(
    input: DateLike,
    now: Date = new Date()
): boolean {
    try {
        const date = asDate(input);
        const yesterdayDate = getYesterday(now);

        // Extract ISO date string from the input date and compare
        const inputDateStr = date.toISOString().split("T")[0];

        return inputDateStr === yesterdayDate;
    }
    catch (e) {
        // asDate throws for invalid input, rethrow for consistency
        throw e;
    }
}
