import type { DateLike, IsoDate } from "inferred-types/types";
import {
    err,
    isError,
    isNumber,
    isObject,
    isString,
    parseDateObject,
    parseIsoDate,
    parseNumericDate
} from "inferred-types/runtime";
import { Never } from "inferred-types/constants";

/**
 * **asIsoDate**`(input)`
 *
 * Converts common date representations to an ISO 8601 Date string (e.g., "2024-01-15").
 *
 * - If the underlying date has a timezone offset then that will be ignored and the year-month-date
 * of the date for the _local time_ will be used.
 */
export function asIsoDate<
    T extends DateLike,
>(input: T): IsoDate | Error {
    try {
        const parsed = isString(input)
            ? parseIsoDate(input)
            : isObject(input)
            ? parseDateObject(input)
            : isNumber(input)
            ? parseNumericDate(input)
            : err(
                `parse/as-iso-date`,
                `An invalid type was passed to asIsoDate(input)!`,
                { type: typeof input, input }
            );

        if(isError(parsed)) {
            return parsed;
        }

        return (
           parsed.dateType === "date" || parsed.dateType === "datetime"
            ? `${parsed.year}-${parsed.month}-${parsed.date}`
            : parsed.dateType === "year"
            ? parsed.year
            : parsed.dateType === "year-independent"
            ? `-${parsed.month}-${parsed.date}`
            : parsed.dateType === "year-month"
            ? `--${parsed.year}-${parsed.month}`
            : Never
        ) as IsoDate

    } catch(e) {
        return err(
            `parse/as-iso-date`,
            `An unexpected problem was encountered running asIsoDate: ${e instanceof Error ? e.message: String(e)}`,
            { input, underlying: e }
        )
    }



}
