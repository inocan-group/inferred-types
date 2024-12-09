import type { MONTH_ABBR, MONTH_NAME } from "inferred-types/constants";
import type {
  NonZeroNumericChar,
  NumericChar,
} from "inferred-types/types";

export type Year<
  T extends "strong" | "simple" = "strong",
> = T extends "strong"
  ? `${"1" | "2"}${NumericChar}${NumericChar}${NumericChar}`
  : `${"1" | "2"}${number}`;

type ZeroThenDigit = `0${NumericChar}`;

/**
 * **MonthName**
 *
 * The month of the year represented as a full string name.
 */
export type MonthName = typeof MONTH_NAME[number];

/**
 * **MonthAbbr**
 *
 * The month of the year represented in an abbreviated string format.
 */
export type MonthAbbr = typeof MONTH_ABBR[number];

/**
 * **MonthNumeric**
 *
 * The month of the year represented in a numeric format.
 */
export type MonthNumeric = "10" | "11" | "12" | `${"0" | ""}${NonZeroNumericChar}`;

/**
 * **MonthDay**
 *
 * The numeric day in the month.
 */
export type MonthDay = ZeroThenDigit | `${"" | "1" | "2"}${NumericChar}` | `3${"0" | "1"}`;

export type DateSeparator = "-" | "/" | ".";

/**
 * **YMD**`<[TSep]>
 * A date format for `YYYY-MM-DD` which is used as a component of the ISO8601 standard.
 *
 * > Note: you may optionally change the DateSeparator to suit your needs
 */
export type YMD<
  TSep extends DateSeparator = "-",
> = `${"1" | "2"}${number}${TSep}${MonthNumeric}${TSep}${number}`;

/**
 * **DateThenMonth**
 *
 * The day of the month followed by an abbreviated string representation
 * of the month (e.g., `4 July`)
 */
export type DateThenMonth = `${MonthDay} ${MonthAbbr}`;

/**
 * **DateThenMonthThenYear**
 *
 * The day of the month followed by an abbreviated string representation
 * of the month and finishing with the year (e.g., `4 July 2021`)
 */
export type DateThenMonthThenYear = `${MonthDay} ${MonthAbbr}${` ${Year<"simple">}`}`;

export type MonthPostfix = "" | "st" | "rd" | "th";

/**
 * **MonthThenDateThenYear**
 *
 * The month's name -- either abbreviate or full -- followed by the
 * day in the month (e.g., `July 28, 1970`, or `July 28th, 1970`)
 */
export type MonthThenDateThenYear = `${MonthAbbr | MonthName} ${MonthDay}${MonthPostfix}${`, ${Year<"simple">}`}`;

/**
 * **MonthThenDate**
 *
 * The month's name -- either abbreviate or full -- followed by the
 * day in the month (e.g., `July 28`, `July 28th`)
 */
export type MonthThenDate = `${MonthAbbr | MonthName} ${MonthDay}${MonthPostfix}`;

export type MonthThenDate_Simple = ``;

/**
 * **MonthAbbrThenDate**
 *
 * The month's name -- in abbreviated form -- followed by the
 * day in the month. You may optionally add a `MonthPostfix` descriptor.
 *
 * ```ts
 * const date: MonthAbbrThenDate[] = ["Jun 6", "Jun 06", "Jun 6th"]
 * ```
 */
export type MonthAbbrThenDate = `${MonthAbbr} ${MonthDay}${MonthPostfix}`;

/**
 * **MonthAbbrThenDateAndYear**
 *
 * The month's name -- in abbreviated form -- followed by the
 * day in the month and the year.
 *
 * - you may optionally add a `MonthPostfix` descriptor
 * - the year must be preceded by `, `
 *
 * ```ts
 * const date: MonthAbbrThenDateAndYear[] = ["Jun 6, 2020", "Jun 06, 2020", "Jun 6th, 2020"]
 * ```
 */
export type MonthAbbrThenDateAndYear = `${MonthAbbr} ${MonthDay}${MonthPostfix}${`, ${Year<"simple">}`}`;

/**
 * **FullDate**
 *
 * Allows the representation of a date using one of several representations:
 *
 * 1. `YYYY-MM-DD` / `YYYY.MM.DD` / `YYYY/MM/DD`
 * 2. `13 Jun 2020`
 * 3. `July 4th, 2019`
 *
 * Note: to keep types as simple as possible, the `YMD` type has been replaced
 * with just the `YMD_Simple` type. If you really need stronger typing use
 * the `FullDateStrong` type.
 */
export type FullDate = YMD | DateThenMonthThenYear | MonthThenDateThenYear;

/**
 * **ShortDate**
 *
 * Represent the month and day of month in one of two structural formats:
 *
 * 1. `13 Jun`
 * 2. `Jun 13` or `Jun 13th` or `June 13th`
 *
 * **Note:** the year is _not_ representable using this type
 */
export type ShortDate = DateThenMonth | MonthThenDate;

/**
 * **Date**
 *
 * An [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html#:~:text=Therefore%2C%20the%20order%20of%20the,27%2018%3A00%3A00.000.)
 * date format which looks like `YYYY-MM-DD`.
 */
export type Date = YMD;
