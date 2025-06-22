import { err, isError, isString } from "inferred-types/runtime";
import { FourDigitYear, MinimalDigitDate, ThreeDigitMillisecond, TimeZone, TwoDigitDate, TwoDigitHour, TwoDigitMinute, TwoDigitMonth, TwoDigitSecond } from "inferred-types/types";



export function isFourDigitYear(str: unknown): str is FourDigitYear {
    const re = /^(-?\d{4})$/;

    return isString(str) && re.test(str);
}

/**
 * Type-guard for TwoDigitHour
 * Matches "00"–"09", "10"–"19", or "20"–"23"
 */
export function isTwoDigitHour(s: unknown): s is TwoDigitHour {
    return isString(s) && /^(?:0[0-9]|1[0-9]|2[0-3])$/.test(s);
}

/**
 * Type-guard for TwoDigitMinute
 */
export function isTwoDigitMinute(s: unknown): s is TwoDigitHour {
    return isString(s) && /^(?:0[0-9]|1[0-9]||2[0-9]|3[0-9]|4[0-9]|5[0-9])$/.test(s);
}

/**
 * Type-guard for isTwoDigitSecond
 */
export function isTwoDigitSecond(s: unknown): s is TwoDigitHour {
    return isString(s) && /^(?:0[0-9]|1[0-9]||2[0-9]|3[0-9]|4[0-9]|5[0-9])$/.test(s);
}

export function isThreeDigitMillisecond(s: unknown): s is ThreeDigitMillisecond {
    return isString(s) && /^(?:[0-9][0-9][0-9])$/.test(s);
}

/**
 * Type-guard for TwoDigitMonth
 * Matches "01"–"09" or "10"–"12"
 */
export function isTwoDigitMonth(s: unknown): s is TwoDigitMonth {
    return isString(s) && /^(?:0[1-9]|1[0-2])$/.test(s);
}

/**
 * TwoDigitDate = "01"–"09", "10"–"29", or "30"–"31"
 */
export function isTwoDigitDate(s: unknown): s is TwoDigitDate {
    return isString(s) && /^(?:0[1-9]|[12][0-9]|3[01])$/.test(s);
}

/**
 * MinimalDigitDate = "1"–"9", or "10"–"29", or "30"–"31"
 */
export function isMinimalDigitDate(s: unknown): s is MinimalDigitDate {
    return isString(s) && /^(?:[1-9]|[12][0-9]|3[01])$/.test(s);
}

/**
 * TimeZone =
 *   "Z"
 *   | ("+"|"-") + TwoDigitHour
 *   | ("+"|"-") + TwoDigitHour + TwoDigitMinute
 *   | ("+"|"-") + TwoDigitHour + ":" + TwoDigitMinute
 *
 * TwoDigitHour: 00–23
 * TwoDigitMinute: 00–59
 */
export function isTimeZone(s: unknown): s is TimeZone {
    return isString(s) && /^(?:Z|[+\-](?:0[0-9]|1[0-9]|2[0-3])(?:[0-5][0-9]|:[0-5][0-9])?)$/.test(s);
}

function isUndefined(val: unknown): val is undefined {
    return val === undefined;
}


export type IsoDateType =
    | "datetime"
    | "date"
    | "year-independent"
    | "year-month"
    | "year";

export type IsoMeta = {
    dateType: IsoDateType;
    hasTime: boolean;
    year?: FourDigitYear;
    month: TwoDigitMonth;
    date?: TwoDigitDate;
    hour?: TwoDigitHour;
    minute?: TwoDigitMinute;
    second?: TwoDigitSecond;
    ms?: ThreeDigitMillisecond | undefined;
    timezone?: TimeZone<"strong">;
}

function shape(
    input: string,
    pattern: IsoDateType,
    match: readonly (string | undefined | Error)[]
) {
    let [, year, month, date, hour, minute, second, ms, timezone] = match as (string | Error | undefined)[];

    let hasTime: boolean = !!(hour && minute);

    switch(pattern) {
        case "datetime": {
            hasTime = true;
        }
        case "year-independent": {
            year = undefined;
        }
        case "year-month": {
            date = undefined;
        }
        case "year": {
            month = undefined;
            date = undefined;
        }
    }

    year = isUndefined(year)
        ? undefined
        : isFourDigitYear(year) ? year : err(`invalid`);
    month = isUndefined(month)
        ? undefined
        : isTwoDigitMonth(month) ? month : err(`invalid`);
    date = isUndefined(date)
        ? undefined
        : isTwoDigitDate(date) ? date : err(`invalid`);
    hour = isUndefined(hour)
        ? undefined
        : isTwoDigitHour(hour) ? hour : err(`invalid`);
    minute = isUndefined(minute)
        ? undefined
        : isTwoDigitMinute(minute) ? minute : err(`invalid`);
    second = isUndefined(minute)
        ? undefined
        : isTwoDigitMinute(second) ? second : err(`invalid`);
    ms = isUndefined(ms)
        ? undefined
        : isThreeDigitMillisecond(ms) ? ms : err(`invalid`);
    timezone = isUndefined(timezone)
        ? undefined
        : isTimeZone(timezone) ? timezone : err(`invalid`);

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
        )
    }


    return {
        dateType: pattern,
        hasTime,
        year,
        month,
        date,
        hour,
        minute,
        second,
        ms,
        timezone
    } as IsoMeta;
}


/**
 * Parses an ISO date or datetime string into its components.
 *
 * Returns an object: { year, month, date, time }
 * - year, month, date: numbers or null
 * - time: { hour, minute, second, ms, offset } or null
 * Throws if the string is not a valid ISO date/datetime.
 */
export function parseIsoDate<T extends string>(input: T): IsoMeta | Error {


    // ISO datetime regex (YYYY-MM-DDTHH:mm:ss(.sss)?(Z|±hh:mm)?)
    const isoDateTime = /^(-?\d{4})-?(\d{2})-?(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:?\d{2})?$/;
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
        if(isError(result)) {
            dateTime = result;
        } else {
            return shape(input, "datetime", match);
        }
    }


    if (match = input.match(isoDate)) {
        const result = shape(input, "date", match);
        if(isError(result)) {
            date = result;
        } else {
            return shape(input, "date", match);
        }
    }

    if (match = input.match(isoMonthDay)) {
        const result = shape(input, "year-independent", match);
        if(isError(result)) {
            yearIndependent = result;
        } else {
            return shape(input, "year-independent", match);
        }
    }

    if (match = input.match(isoYearMonth)) {
        const result = shape(input, "year-month", match);
        if(isError(result)) {
            yearMonth = result;
        } else {
            return shape(input, "year-month", match);
        }
    }

    if (match = input.match(isoYear)) {
        const result = shape(input, "year", match);
        if(isError(result)) {
            year = result;
        } else {
            return shape(input, "year", match);
        }
    }

    return err("parse/iso-date", "The string passed to parseIsoDate() was invalid!",
        { input, matched: {dateTime, date, yearMonth, yearIndependent, year} }
    )
}
