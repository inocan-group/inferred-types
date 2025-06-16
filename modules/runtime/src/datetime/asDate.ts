import {
    err,
    isDate,
    isDateFnsDate,
    isEpochInMilliseconds,
    isEpochInSeconds,
    isIsoDate,
    isIsoDateTime,
    isIsoExplicitDate,
    isIsoImplicitDate,
    isIsoYear,
    isLuxonDate,
    isMoment,
    isNumber,
    isTemporalDate,
    stripAfter
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
    // Always return a Date at 00:00:00.000 UTC
    const toUtcMidnight = (d: Date) => {
        return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
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
        const [date] = stripAfter(input as string, "T").split("T");
        const [year, month, day] = (date as string).split("-").map(Number);
        return new Date(Date.UTC(year, month - 1, day));
    }

    if (isIsoExplicitDate(input)) {
        // e.g. 2023-06-16
        const [year, month, day] = (input as string).split("-").map(Number);
        return new Date(Date.UTC(year, month - 1, day));
    }

    if (isNumber(input) && isEpochInMilliseconds(input)) {
        return toUtcMidnight(new Date(input));
    }

    if (isNumber(input) && isEpochInSeconds(input)) {
        return toUtcMidnight(new Date(input * 1000));
    }

    if (isIsoYear(input)) {
        // e.g. 2023
        return new Date(Date.UTC(Number(input), 0, 1));
    }

    if (isIsoDate(input)) {
        // e.g. 2023-06-16
        const [year, month, day] = (input as string).split("-").map(Number);
        return new Date(Date.UTC(year, month - 1, day));
    }

    if (isIsoImplicitDate(input)) {
        // e.g. 20230616
        const year = Number((input as string).slice(0, 4));
        const month = Number((input as string).slice(4, 6));
        const day = Number((input as string).slice(6, 8));
        return new Date(Date.UTC(year, month - 1, day));
    }

    throw err(`invalid/date`, `The date-like value you passed to 'asDate()' function was unable to be converted to a Javascript Date object!`, { date: input });
}
