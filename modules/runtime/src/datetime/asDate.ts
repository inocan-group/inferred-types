import {
    err,
    isDate,
    isDateFnsDate,
    isEpochInMilliseconds,
    isEpochInSeconds,
    isError,
    isIsoDate,
    isIsoDateTime,
    isIsoExplicitDate,
    isIsoImplicitDate,
    isIsoYear,
    isLuxonDate,
    isMoment,
    isNumber,
    isTemporalDate,
    parseIsoDate
} from "inferred-types/runtime";

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
export function asDate<T extends number | string | Record<string, any> | Date>(input: T): Date {
    // DEBUG: Log input and all type guard results for string inputs
    // Debug code removed
    // Always return a Date at 00:00:00.000 UTC
    // Strips time, preserves local calendar day (no timezone shift)
    const toUtcMidnight = (d: Date) => {
        const utc = new Date(Date.UTC(
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
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

    if (isDateFnsDate(input)) {
        return toUtcMidnight(new Date(input.toISOString()));
    }

    if (isTemporalDate(input)) {
        // Temporal.PlainDate to ISO string, then parse as UTC
        return toUtcMidnight(new Date(input.toString()));
    }

    if (isIsoDateTime(input)) {
        // e.g. 2023-06-16T12:34:56Z or 2023-06-16T12:34:56+02:00
        const parsed = parseIsoDate(input as string);
        if (isError(parsed)) {
            throw parsed;
        }
        // Use only the date components, ignore time
        const year = Number(parsed.year);
        const month = Number(parsed.month);
        const day = Number(parsed.date);
        return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    }

    if (isNumber(input) && isEpochInMilliseconds(input)) {
        return toUtcMidnight(new Date(input));
    }

    if (isNumber(input) && isEpochInSeconds(input)) {
        return toUtcMidnight(new Date(input * 1000));
    }

    if (isIsoYear(input)) {
        // e.g. 2023
        const parsed = parseIsoDate(input as string);
        if (isError(parsed)) {
            throw parsed;
        }
        const year = Number(parsed.year);
        return new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
    }

    if (isIsoExplicitDate(input)) {
        // e.g. 2023-06-16
        const parsed = parseIsoDate(input as string);
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
        const parsed = parseIsoDate(input as string);
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
        const parsed = parseIsoDate(input as string);
        if (isError(parsed)) {
            throw parsed;
        }
        const year = Number(parsed.year);
        const month = Number(parsed.month);
        const day = Number(parsed.date);
        return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    }

    throw err(`invalid/date`, `The date-like value you passed to 'asDate()' function was unable to be converted to a Javascript Date object!`, { date: input });
}
