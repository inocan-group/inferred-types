import type { DateLike } from "inferred-types/types";
import {
    asString,
    err,
    isError,
    isNumber
} from "inferred-types/runtime";

import { parseIsoDate } from "runtime/datetime";
import {
    isDate,
    isEpochInMilliseconds,
    isEpochInSeconds,
    isFourDigitYear,
    isIsoDate,
    isIsoDateTime,
    isIsoExplicitDate,
    isIsoImplicitDate,
    isIsoYear,
    isLuxonDate,
    isMoment,
    isTemporalDate,
} from "runtime/type-guards/datetime";

/**
 * **asDate**`(input)`
 *
 * Converts common date representations to a Javascript Date object.
 *
 * - the goal is to have **Date** information but not **Time** information
 *     - use `asDateTime()` if you wish to preserve time info
 * - all time information -- if present when passed in -- should be set to
 * the stroke of midnight and be in UTC timezone
 */
export function asDate<
    T extends DateLike
>(input: T): Date {
    if (input === undefined) {
        throw err(
            "invalid-date",
            `The asDate() function was passed an undefined value!`
        );
    }

    try {
    // DEBUG: Log input and all type guard results for string inputs
        // Debug code removed
        // Always return a Date at 00:00:00.000 UTC
        // Strips time, preserves local calendar day (no timezone shift)
        const toUtcMidnight = (d: Date) => {
            const utc = new Date(Date.UTC(
                d.getUTCFullYear(),
                d.getUTCMonth(),
                d.getUTCDate(),
                0,
                0,
                0,
                0
            ));
            return utc;
        };

        if (isDate(input)) {
        // Clone to avoid mutating input
            return toUtcMidnight(new Date(input.getTime()));
        }

        if (isMoment(input)) {
            return toUtcMidnight(input.toDate());
        }

        if (isLuxonDate(input)) {
            return toUtcMidnight(input.toJSDate());
        }

        if (isDate(input)) {
            return toUtcMidnight(input);
        }

        if (isTemporalDate(input)) {
        // Temporal.PlainDate to ISO string, then parse as UTC
            return toUtcMidnight(new Date(input.toString()));
        }

        if (isIsoDateTime(input)) {
        // e.g. 2023-06-16T12:34:56Z or 2023-06-16T12:34:56+02:00
            const parsed = parseIsoDate(input);
            if (isError(parsed)) {
                throw parsed;
            }
            // Use only the date components, ignore time
            const year = Number(parsed.year);
            const month = Number(parsed.month);
            const day = Number(parsed.date);
            return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
        }

        // Check for 4-digit year string (ISO standard)
        if (isFourDigitYear(input)) {
            const year = Number(input);
            return new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
        }
        
        // Check if numeric input is a 4-digit year (between 1000 and 9999)
        if (isNumber(input) && input >= 1000 && input <= 9999 && Math.floor(input) === input) {
            // Treat as a year value
            return new Date(Date.UTC(input, 0, 1, 0, 0, 0, 0));
        }

        if (isNumber(input) && isEpochInMilliseconds(input)) {
            return toUtcMidnight(new Date(input));
        }

        if (isNumber(input) && isEpochInSeconds(input)) {
            return toUtcMidnight(new Date(input * 1000));
        }

        if (isIsoYear(input)) {
        // e.g. 2023
            const parsed = parseIsoDate(input);
            if (isError(parsed)) {
                throw parsed;
            }
            const year = Number(parsed.year);
            return new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
        }

        if (isIsoExplicitDate(input)) {
        // e.g. 2023-06-16
            const parsed = parseIsoDate(input);
            if (isError(parsed)) {
                throw parsed;
            }
            const year = Number(parsed.year);
            const month = Number(parsed.month);
            const day = Number(parsed.date);
            return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
        }

        if (isIsoImplicitDate(input)) {
        // e.g. 20230616
            const parsed = parseIsoDate(input);
            if (isError(parsed)) {
                throw parsed;
            }
            const year = Number(parsed.year);
            const month = Number(parsed.month);
            const day = Number(parsed.date);

            return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
        }

        if (isIsoDate(input)) {
        // e.g. This might be for other ISO date formats
            const parsed = parseIsoDate(input);
            if (isError(parsed)) {
                throw parsed;
            }
            const year = Number(parsed.year);
            const month = Number(parsed.month);
            const day = Number(parsed.date);
            return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
        }
    }
    catch (e) {
        if (isError(e)) {
            throw err(
                `parse-date/as-date`,
                `The input passed to asDate(${asString(input)}) function ran into an error while trying to convert this input into a Javascript date object. Underlying error message was: ${e.message}`
            );
        }
        else {
            throw err(
                `parse-date/as-date`,
                `The input passed to asDate(${asString(input)}) function ran into an error while trying to convert this input into a Javascript date object. Underlying error message was: ${asString(e)}`
            );
        }
    }

    throw err(`invalid/date`, `The date-like value you passed to 'asDate(${asString(input)})' function was unable to be converted to a Javascript Date object!`, { date: input });
}
