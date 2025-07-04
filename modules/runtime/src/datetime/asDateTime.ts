import type { DateLike } from "inferred-types/types";
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
    isTemporalDate
} from "inferred-types/runtime";

/**
 * **asDateTime**`(input)`
 *
 * Converts common date representations to a Javascript Date object.
 *
 * - the goal is to have both **Date** and **Time** information preserved
 *     - use `asDate()` if you wish to only preserve date information
 */
export function asDateTime<T extends DateLike>(input: T): Date {
    if (isDate(input)) {
        return new Date(input.getTime()); // clone
    }

    if (isMoment(input)) {
        return input.toDate();
    }

    if (isLuxonDate(input)) {
        // Use toJSDate() directly; this preserves the exact instant in time and the offset
        return input.toJSDate();
    }

    if (isDateFnsDate(input)) {
        return new Date(input.toISOString());
    }

    if (isTemporalDate(input)) {
        // Temporal.PlainDate or PlainDateTime to ISO string
        return new Date(input.toString());
    }

    if (isIsoDateTime(input)) {
        // e.g. 2023-06-16T12:34:56Z or 2023-06-16T12:34:56+02:00
        return new Date(input as string);
    }

    if (isIsoExplicitDate(input)) {
        // e.g. 2023-06-16 (no time info)
        return new Date(`${input}T00:00:00.000Z`);
    }

    if (isNumber(input) && isEpochInMilliseconds(input)) {
        return new Date(input);
    }

    if (isNumber(input) && isEpochInSeconds(input)) {
        return new Date(input * 1000);
    }

    if (isIsoYear(input)) {
        // e.g. 2023 (no time info)
        return new Date(`${input}-01-01T00:00:00.000Z`);
    }

    if (isIsoImplicitDate(input)) {
        // e.g. 20230616 (no time info)
        const year = Number((input as string).slice(0, 4));
        const month = Number((input as string).slice(4, 6));
        const day = Number((input as string).slice(6, 8));
        return new Date(Date.UTC(year, month - 1, day));
    }

    if (isIsoDate(input)) {
        // e.g. 2023-06-16 (no time info)
        return new Date(`${input}T00:00:00.000Z`);
    }

    throw err(`invalid/date`, `The date-like value you passed to 'asDateTime()' function was unable to be converted to a Javascript Date object!`, { date: input });
}
