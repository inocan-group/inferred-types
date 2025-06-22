import { isString } from "inferred-types/runtime";
import { FourDigitYear, MinimalDigitDate, ParsedTime, TimeZone, TwoDigitDate, TwoDigitHour, TwoDigitMonth } from "inferred-types/types";

export type IsoMeta = {
    year: FourDigitYear | null;
    month: TwoDigitMonth;
    date: TwoDigitDate | null;
    time: ParsedTime | null;
}

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


    if ((match = input.match(isoDateTime))) {
        let [, year, month, date, hour, minute, second, ms = "0", offset = "Z"] = match as (string|null|undefined)[]

        year = isFourDigitYear(year) ? year : null;
        month = isTwoDigitMonth(month) ? month : null;
        date = isTwoDigitDate(date) ? date : null;
        hour =


        return {
            year: isFourDigitYear(year) ? year : null,
            month: isTwoDigitMonth(month) ? ,
            date: Number(date),
            time: {
                hour: Number(hour),
                minute: Number(minute),
                second: Number(second),
                ms: Number(ms),
                offset: offset || "Z"
            }
        };
    }
    if ((match = input.match(isoDate))) {
        const [, year, month, date] = match;
        return {
            year: Number(year),
            month: Number(month),
            date: Number(date),
            time: null
        };
    }
    if ((match = input.match(isoYear))) {
        const [, year] = match;
        return {
            year: Number(year),
            month: null,
            date: null,
            time: null
        };
    }
    if ((match = input.match(isoYearMonth))) {
        const [, year, month] = match;
        return {
            year: Number(year),
            month: Number(month),
            date: null,
            time: null
        };
    }
    if ((match = input.match(isoMonthDay))) {
        const [, month, date] = match;
        return {
            year: null,
            month: Number(month),
            date: Number(date),
            time: null
        };
    }

    return new Error(`Input is not a valid ISO date or datetime: ${input}`);
}
