import type { DateLike } from "inferred-types/types";
import {
    err,
    isDate,
    isDateFnsDate,
    isEpochInMilliseconds,
    isEpochInSeconds,
    isIsoDate,
    isIsoDateTime,
    isIsoYear,
    isLuxonDate,
    isIsoYearMonth,
    isIsoMonthDate,
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
        return input.toJSDate();
    }

    if (isDateFnsDate(input)) {
        return new Date(input.toISOString());
    }

    if (isTemporalDate(input)) {
        return new Date(input.toString());
    }

    if (isIsoDate(input)) {
        // e.g. 2023-06-16 (no time info)
        return new Date(`${input}T00:00:00.000Z`);
    }


    if (isIsoDateTime(input)) {
        return new Date(input);
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

    if(isIsoYearMonth(input)) {

    }



    throw err(`invalid/date`, `The date-like value you passed to 'asDateTime()' function was unable to be converted to a Javascript Date object!`, { date: input });
}
