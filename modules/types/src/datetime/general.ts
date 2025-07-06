import type { NumericChar, NumericChar__NonZero } from "inferred-types/types";

/**
 * common characters used to separate date representations
 */
export type DateSeparator = "-" | "/" | ".";

export type TwoDigitHour =
    | `0${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `1${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `2${0 | 1 | 2 | 3}`;

export type TwoDigitMinute =
    | `0${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `1${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `2${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `3${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `4${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `5${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;

export type TwoDigitSecond = TwoDigitMinute;

export type ThreeDigitMillisecond = `${NumericChar}${NumericChar}${NumericChar}`;

export type TwoDigitMonth = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`;

/**
 * a union of valid month numbers
 */
export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type TwoDigitDate<T extends "weak" | "normal" = "normal"> =
    T extends "normal"
    ?
    | `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `1${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `2${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `3${0 | 1}`

    : | `0${number}`
    | `1${number}`
    | `2${number}`
    | `3${number}`;

/**
 * **MinimalDigitDate**
 *
 * Digit combinations for representing a month's date's
 * but only allowing single digit representation for dates
 * like 1, 2, 3, etc.
 *
 *  **Related:** `TwoDigitDate`, `MonthDateDigit`
 */
export type MinimalDigitDate<
    T extends "weak" | "normal" = "normal"
> = T extends "normal"
    ?
    | NumericChar__NonZero
    | `1${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `2${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `3${0 | 1}`
    :
    | `0${number}`
    | `1${number}`
    | `2${number}`
    | `3${number}`;

type StDays = "1" | "21" | "31";
type NdDays = "2" | "22";
type RdDays = "3" | "23";

type ThDays<T extends "weak" | "normal" = "normal"> = Exclude<MinimalDigitDate<T>, StDays | NdDays | RdDays>;

export type MinimalDigitDate__Suffixed<T extends "weak" | "normal" = "normal"> =
    | `${StDays}st`
    | `${NdDays}nd`
    | `${RdDays}rd`
    | `${ThDays<T>}th`;

/**
 * **MonthDateDigit**
 *
 * Union type of a both two digit and single digit
 * representations of a month's date.
 *
 * **Related:** `TwoDigitDate`, `MinimalDigitDate`
 */
export type MonthDateDigit<
    T extends "weak" | "normal" = "normal"
> = TwoDigitDate<T> | NumericChar__NonZero;

/**
 * **FourDigitYear**`<[T]>`
 *
 * Represents a four digit year in the type system.
 *
 * - it is intended to be able to represent _any_ four digit year
 * - it more opinionated in the years 1000-2999 as that's typically
 * what we're working with
 * - this type _will_ allow false positives and you'll need to use
 * runtime validation to get the `IsoYear` type which is a branded
 * type that indicates it has been validated.
 *
 * **Note:**
 * - by default we use a moderate strength pattern (aka, "normal") but you
 * can set this to "strong" and it will be more opinionated but be sure the
 * union type it creates doesn't overwhelm Typescript.
 * - if you need to simplify further you can opt for "weak"
 */
export type FourDigitYear<
    T extends "strong" | "normal" | "weak" = "normal"
> = T extends "strong"
    ? `${"1" | "2"}${NumericChar}${NumericChar}${NumericChar}`
    | `${"0" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}${number}`
    : T extends "normal"
    ? `${"1" | "2"}${NumericChar}${number}`
    | `${"0" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}${number}`
    : `${NumericChar}${number}`; // weak;

export type TimeZoneExplicit = | `Z`
    | `${"+" | "-"}${TwoDigitHour}`
    | `${"+" | "-"}${TwoDigitHour}:${number}`

/**
 * **TimezoneOffset**`<[strong | NORMAL]`>
 *
 * - “Z”
 * - “±hh”
 * - “±hhmm”
 * - “±hh:mm”
 *
 * **Note:**
 * - by default we use a moderate strength pattern (aka, "normal") but you
 * can set this to "strong" and it will be more opinionated but be sure the
 * union type it creates doesn't overwhelm Typescript.
 * - when `T` is set to "strong" then it is _self-validating_ (aka, all
 * valid variants allowed and zero invalid variants allowed)
 */
export type TimezoneOffset<T extends "strong" | "normal" = "normal"> =
    T extends "normal"
    ? | `Z`
    | `${"+" | "-"}${number}`
    | `${"+" | "-"}${number}${number}`
    | `${"+" | "-"}${number}:${number}`
    :
    | `Z`
    | `${"+" | "-"}${TwoDigitHour}`
    | `${"+" | "-"}${TwoDigitHour}${TwoDigitMinute}`
    | `${"+" | "-"}${TwoDigitHour}:${TwoDigitMinute}`;
