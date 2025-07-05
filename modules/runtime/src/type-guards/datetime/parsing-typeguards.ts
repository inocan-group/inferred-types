import { isString } from "runtime/type-guards/isString";
import {
    FourDigitYear,
    MinimalDigitDate,
    ThreeDigitMillisecond,
    TimeZone,
    TwoDigitDate,
    TwoDigitHour,
    TwoDigitMinute,
    TwoDigitMonth,
    TwoDigitSecond
} from "types/datetime"


/**
 * type-guard based on whether `str` is a `FourDigitYear`
 */
export function isFourDigitYear(str: unknown): str is FourDigitYear {
    const re = /^(-?\d{4})$/;

    return isString(str) && re.test(str);
}

/**
 * Type-guard for TwoDigitHour
 * Matches "00"–"09", "10"–"19", or "20"–"23"
 */
export function isTwoDigitHour(s: unknown): s is TwoDigitHour {
    return isString(s) && /^(?:0\d|1\d|2[0-3])$/.test(s);
}

/**
 * Type-guard for TwoDigitMinute
 */
export function isTwoDigitMinute(s: unknown): s is TwoDigitMinute {
    return isString(s) && /^(?:0\d|1\d|2\d|3\d|4\d|5\d)$/.test(s);
}

/**
 * Type-guard for isTwoDigitSecond
 */
export function isTwoDigitSecond(s: unknown): s is TwoDigitSecond {
    return isString(s) && /^(?:0\d|1\d|2\d|3\d|4\d|5\d)$/.test(s);
}

export function isThreeDigitMillisecond(s: unknown): s is ThreeDigitMillisecond {
    return isString(s) && /^\d\d\d$/.test(s);
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
    return isString(s) && /^(?:0[1-9]|[12]\d|3[01])$/.test(s);
}

/**
 * MinimalDigitDate = "1"–"9", or "10"–"29", or "30"–"31"
 */
export function isMinimalDigitDate(s: unknown): s is MinimalDigitDate {
    return isString(s) && /^(?:[1-9]|[12]\d|3[01])$/.test(s);
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
    return isString(s) && /^(?:Z|[+\-](?:0?\d|1\d|2[0-3])(?::?[0-5]\d)?)$/.test(s);
}
