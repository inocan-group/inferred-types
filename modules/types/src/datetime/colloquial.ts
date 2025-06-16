import type { FourDigitYear, MinimalDigitDate__Suffixed, MonthAbbrev, MonthDateDigit, MonthName } from "inferred-types/types";

/**
 * **DateMonthAbbrev**
 *
 * Represents the type shape for date representations such as:
 *
 * - `12 Jun`
 * - `1 Jul`
 * - `04 Jul`
 *
 * This style of date format is common across Europe.
 *
 * **Note:**
 * - this type is _self-validating_; the type structure ensures a
 * valid representation of the type without need for any runtime
 * validation.
 */
export type DateMonthAbbrev =
    | `${MonthDateDigit} ${MonthAbbrev}`;

/**
 * **DateMonthAbbrevYearLike**
 *
 * Represents the type shape for date representations such as:
 *
 * - `12 Jun, 2001`
 * - `1 Jul, 2020`
 * - `04 Jul, 2025`
 */
export type DateMonthAbbrevYearLike =
    | `${MonthDateDigit} ${MonthAbbrev}, ${FourDigitYear<"weak">}`;

/**
 * **DateMonth**
 *
 * Represents the type shape for date representations such as:
 *
 * - `12 June`
 * - `1 July`
 * - `04 July`
 *
 * This style of date format is common across Europe.
 *
 * **Note:**
 * - this type is _self-validating_; the type structure ensures a
 * valid representation of the type without need for any runtime
 * validation.
 */
export type DateMonth =
    | `${MonthDateDigit} ${MonthName}`;

/**
 * **DateMonthYearLike**`<{T}>`
 *
 * Represents the type shape for date representations such as:
 *
 * - `12 June, 2001`
 * - `1 July, 2020`
 * - `04 July, 2025`
 *
 * This style of date format is common across Europe.
 *
 * **Note:**
 * - this type is too complex to make it _self-validating_ so it's design
 * is to make sure all valid representations are allowed while not allowing
 * as much as we can.
 * - if you need to be certain this format is valid that run it
 * though the `isDateMonthNameYear()` validator and it will check with
 * via the runtime and then upgrade this type to a _branded_ type of
 * `DateMonthNameYear`
 * - in fact, since the issue is only with cyclometric complexity of the
 * type (versus a logic problem requiring the runtime) you can actually
 * validate in the type system with `IsDateMonthNameYearLike` utility.
 */
export type DateMonthYearLike<T extends "weak" | "normal" = "weak"> =
    | `${MonthDateDigit<T>} ${MonthAbbrev}, ${FourDigitYear<"weak">}`;

/**
 * **DateMonthYear**
 *
 * A _validated_ `DateMonthYearLike` type to represent types
 * such as:
 *
 * - `12 June, 2001`
 * - `1 July, 2020`
 * - `04 July, 2025`
 *
 * This style of date format is common across Europe.
 */
export type DateMonthYear = DateMonthAbbrevYearLike & {
    kind: "DateMonthYear";
};

/**
 * **MonthAbbrevDate**
 *
 * Represents the type shape for date representations such as:
 *
 * - `Jun 12`
 * - `Jun 12th`
 * - `Jul 1st`
 * - `Nov 23rd`
 *
 * This style of date format is common across Europe.
 *
 * **Note:**
 * - this type is _self-validating_; the type structure ensures a
 * valid representation of the type without need for any runtime
 * validation.
 */
export type MonthAbbrevDate =
    | `${MonthName} ${MonthDateDigit | MinimalDigitDate__Suffixed}`;

/**
 * **MonthDate**
 *
 * Represents dates such as:
 *
 * - `Jun 12`
 * - `Jun 12th`
 * - `Jul 1st`
 * - `Nov 23rd`
 *
 * This style of date format is most common in the US.
 *
 * **Note:**
 * - this type is _self-validating_; the type structure ensures a
 * valid representation of the type without need for any runtime
 * validation.
 */
export type MonthDate =
    | `${MonthName} ${MonthDateDigit | MinimalDigitDate__Suffixed}`;

/**
 * **MonthDateYearLike**
 *
 * Represents dates such as:
 *
 * - `Jun 12, 2001`
 * - `Jun 12th, 2015`
 * - `Jul 1st, 2020`
 * - `Nov 23rd, 2025`
 *
 * **Note:**
 * - there is no way to make this type _self-validating_ because of the
 * type's cyclometric complexity
 * - however, you can use either the runtime `isMonthDateYear()` type guard
 * or the `IsMonthDateYear` type checker to validate and convert it to
 * the branded type `MonthDateYear`
 */
export type MonthDateYearLike =
    | `${MonthName} ${MonthDateDigit<"weak">
    | MinimalDigitDate__Suffixed<"normal">}`;

/**
 * **MonthDateYear**
 *
 * A branded type which represents dates such as:
 *
 * - `Jun 12, 2001`
 * - `Jun 12th, 2015`
 * - `Jul 1st, 2020`
 * - `Nov 23rd, 2025`
 *
 * This type is the result of using either `isMonthDateYear()` or
 * `IsMonthDateYear` to validate the `MonthDateYearLike` type.
 */
export type MonthDateYear = MonthDateYearLike & {
    kind: "MonthDateYear";
};

export type MonthAbbrevDateYearLike =
    | `${MonthAbbrev} ${MonthDateDigit<"weak">}`
    | `${MonthAbbrev} ${MinimalDigitDate__Suffixed<"normal">}`;

export type MonthAbbrevDateYear = MonthAbbrevDateYearLike & {
    kind: "MonthDateAbbrevYear";
};
