import type {
    FourDigitYear,
    MinimalDigitDate,
    ThreeDigitMillisecond,
    TimeZone,
    TwoDigitDate,
    TwoDigitHour,
    TwoDigitMinute,
    TwoDigitMonth,
    TwoDigitSecond,
    ParseDate,
    ParsedDate,
    AsParsedDate,
    IsUnion,
    DateType,
    DateMeta
} from "inferred-types/types";

import { err } from "runtime/errors";
import { isFourDigitYear, isThreeDigitMillisecond, isTimeZone, isTwoDigitDate, isTwoDigitHour, isTwoDigitMinute, isTwoDigitMonth, isTwoDigitSecond } from "runtime/type-guards/datetime"
import { isError } from "runtime/type-guards/isError";

function isUndefined(val: unknown): val is undefined {
    return val === undefined;
}


function shape(
    input: string,
    pattern: DateType,
    match: readonly (string | undefined | Error)[]
) {
    let [, year, month, date, hour, minute, second, ms, timezone] = match as (string | Error | null)[];


    year = isUndefined(year)
        ? null
        : isFourDigitYear(year) ? year : err(`invalid`);
    month = isUndefined(month)
        ? null
        : isTwoDigitMonth(month) ? month : err(`invalid`);
    date = isUndefined(date)
        ? null
        : isTwoDigitDate(date) ? date : err(`invalid`);
    hour = isUndefined(hour)
        ? null
        : isTwoDigitHour(hour) ? hour : err(`invalid`);
    minute = isUndefined(minute)
        ? null
        : isTwoDigitMinute(minute) ? minute : err(`invalid`);
    second = isUndefined(second)
        ? null
        : isTwoDigitSecond(second) ? second : err(`invalid`);
    ms = isUndefined(ms)
        ? null
        : isThreeDigitMillisecond(ms) ? ms : err(`invalid`);
    timezone = isUndefined(timezone)
        ? null
        : isTimeZone(timezone) ? timezone : err(`invalid`);


    /**
     * tests whether:
     *
     * 1. has `hour` and `minute` values
     * 2. whether the time elements are all set to 0's
     *
     * The intent is for a date object -- which ALWAYS includes time
     * info when converted to an ISO string -- for a UTC time that is
     * exactly at midnight to report `false` for this metric.
     */
    let hasTime: boolean = input.includes("T")
        ? (timezone === "Z" || timezone === undefined)
            && hour === "00"
            && minute === "00"
            && (second === "00" || second === undefined)
            && (ms === "000" || ms === undefined)
            ? false : true
        : false;


    const invalid: string[] = [];

    if (isError(year)) {
        invalid.push("year");
    }
    if (isError(month)) {
        invalid.push("month");
    }
    if (isError(date)) {
        invalid.push("date");
    }
    if (isError(minute)) {
        invalid.push("minute");
    }
    if (isError(second)) {
        invalid.push("second");
    }
    if (isError(ms)) {
        invalid.push("ms");
    }
    if (isError(timezone)) {
        invalid.push("timezone");
    }

    if (invalid.length > 0) {
        return err(
            `parse/iso-date`,
            `The string of '${input}' is not a valid ISO date! The following components were invalid: ${invalid.join(", ")}`,
            { sections: invalid }
        );
    }

    const result: DateMeta = {
        dateType: pattern,
        hasTime,
        year: year as FourDigitYear | null,
        month: month as TwoDigitMonth,
        date: isError(date) ? undefined : date as TwoDigitDate | null,
        hour: isError(hour) ? undefined : hour as TwoDigitHour | null,
        minute: isError(minute) ? undefined : minute as TwoDigitMinute | null,
        second: isError(second) ? undefined : second as TwoDigitSecond | null,
        ms: isError(ms) ? undefined : ms as ThreeDigitMillisecond | null
    };


    // Handle timezone/offset
    if (timezone && !isError(timezone)) {
        result.timezone = timezone as TimeZone<"strong">;
    } else if (pattern === "date") {
        // For date-only patterns, tests expect timezone: undefined
        result.timezone = undefined;
    } else if (pattern === "year" || pattern === "year-month" || pattern === "year-independent") {
        // For these patterns, tests expect timezone: undefined
        result.timezone = undefined;
    }

    return result as DateMeta;
}

type Returns<T extends string> = [IsUnion<T>] extends [true]
    ? DateMeta | Error
    : ParseDate<T> extends Error
        ? ParseDate<T> & Error
    : ParseDate<T> extends ParsedDate
        ? AsParsedDate<ParseDate<T>>
        : Error;

/**
 * Parses an ISO date or datetime string into its components.
 *
 * Returns an object: { year, month, date, time }
 * - year, month, date: numbers or null
 * - time: { hour, minute, second, ms, offset } or null
 * Throws if the string is not a valid ISO date/datetime.
 */
export function parseIsoDate<
    const T extends string
>(
    input: T
): Returns<T> {
    // ISO datetime regex (YYYY-MM-DDTHH:mm:ss(.sss)?(Z|±hh:mm)?)
    const isoDateTime = /^(-?\d{4})-?(\d{2})-?(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(Z|[+-]\d{2}:?\d{2})?$/;
    // ISO date (YYYY-MM-DD or YYYYMMDD)
    const isoDate = /^(-?\d{4})-?(\d{2})-?(\d{2})$/;
    // Year only
    const isoYear = /^(-?\d{4})$/;
    // Year/month only: -YYYY-MM or -YYYYMM
    const isoYearMonth = /^-?(\d{4})-?(\d{2})$/;
    // Year-less: --MM-DD or --MMDD
    const isoMonthDay = /^--(\d{2})-?(\d{2})$/;

    let match;

    let dateTime: Error | null = null;
    let date: Error | null = null;
    let yearMonth: Error | null = null;
    let yearIndependent: Error | null = null;
    let year: Error | null = null;

    if ((match = input.match(isoDateTime))) {
        const result = shape(input, "datetime", match);
        if (isError(result)) {
            dateTime = result;
        }
        else {
            return shape(input, "datetime", match) as Returns<T>
        }
    }

    if (match = input.match(isoDate)) {
        const result = shape(input, "date", match);
        if (isError(result)) {
            date = result;
        }
        else {
            return shape(input, "date", match)  as Returns<T>;
        }
    }

    if (match = input.match(isoMonthDay)) {
        // For year-independent, we need to rearrange the match array
        // because shape expects [full, year, month, date, ...]
        // but isoMonthDay gives us [full, month, date]
        const rearrangedMatch = [match[0], undefined, match[1], match[2]];
        const result = shape(input, "year-independent", rearrangedMatch);
        if (isError(result)) {
            yearIndependent = result;
        }
        else {
            return result  as Returns<T>;
        }
    }

    if (match = input.match(isoYearMonth)) {
        const result = shape(input, "year-month", match);
        if (isError(result)) {
            yearMonth = result;
        }
        else {
            return shape(input, "year-month", match) as Returns<T>;
        }
    }

    if (match = input.match(isoYear)) {
        const result = shape(input, "year", match);
        if (isError(result)) {
            year = result;
        }
        else {
            return shape(input, "year", match)  as Returns<T>;
        }
    }

    return err(
        "parse/iso-date",
        "The string passed to parseIsoDate() was invalid!", { input, matched: { dateTime, date, yearMonth, yearIndependent, year } }
    ) as unknown as  Returns<T>;
}
