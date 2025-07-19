import type {
    ISO_DATE_30,
    ISO_DATE_31,
    ISO_MONTH_WITH_30
} from "inferred-types/constants";
import type {
    Brand,
    Err,
    IsFourDigitYear,
    IsTwoDigitMonth,
    NumericChar,
    NumericChar__NonZero,
    NumericChar__ZeroToFive,
} from "inferred-types/types";

/**
 * common characters used to separate date representations
 */
export type DateSeparator = "-" | "/" | ".";

/**
 * Valid ISO Dates for months with 30 days
 */
export type IsoDate30 = typeof ISO_DATE_30[number];

/**
 * Valid ISO Dates for months with 31 days
 */
export type IsoDate31 = typeof ISO_DATE_31[number];

export type IsoMonthsWith30Days = typeof ISO_MONTH_WITH_30[number];

export type TwoDigitHour<
    T extends "weak" | "normal" | "strong" | "branded" | `${number}` = "normal"
> =
    T extends "weak"
        ? `${number}`
        : T extends "normal"
            ? `0${number}` | `1${number}` | `2${0 | 1 | 2 | 3}`
            : T extends "strong"
                ?
    | `0${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `1${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `2${0 | 1 | 2 | 3}`
    : T extends "branded"
        ? Brand<`${number}`, "TwoDigitHour">
    : T extends `${number}`
        ? T extends TwoDigitHour<"strong">
            ? Brand<T, "TwoDigitHour">
            : never
        : never;

export type TwoDigitMinute<
    T extends "weak" | "normal" | "strong" | "branded" | `${number}` = "normal"
> =
    T extends "weak"
        ? `${number}`
    : T extends "normal"
            ? `${0 | 1 | 2 | 3 | 4 | 5}${number}`
    : T extends "strong"
        ?
        | `0${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
        | `1${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
        | `2${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
        | `3${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
        | `4${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
        | `5${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    : T extends "branded"
        ? Brand<`${number}`, "TwoDigitMinute">
        : T extends `${number}`
            ? T extends TwoDigitMinute<"strong">
                ? Brand<T, "TwoDigitMinute">
                : never

    : never;


export type TwoDigitSecond<
    T extends "normal" | "strong" | "branded" | `${number}` = "normal"
> = T extends "branded"
    ? Brand<`${number}`, "TwoDigitSecond">
    : T extends "normal"
        ? `${NumericChar__ZeroToFive}${number}` & `${number}`
    : T extends "strong"
            ? `${NumericChar__ZeroToFive}${NumericChar}` & `${number}`
    : T extends `${number}`
        ? T extends TwoDigitSecond<"strong">
            ? Brand<T, "TwoDigitSecond">
            : Err<
                `invalid-type/second`,
                `The type passed into 'TwoDigitSecond<${T}>' is not a valid two digit month!`,
                { second: T }
            >
    : never;

/**
 * **ThreeDigitMillisecond**`<NORMAL|strong|branded>`
 *
 * A three digit number prefixed by `.` as found in ISO DateTime string
 *
 * - `strong` variant is _self-validating_ but requires a large union type
 * to achieve this
 * - `normal` variant provides a bit of guard rails, only allowing two or
 * more numeric characters and union type is reasonably constrained
 * - `weak` is just any numeric literal and is for times when your type
 * budget is low
 * - `branded` variant is for when another utility has _validated_ this
 * numeric string to be valid
 */
export type ThreeDigitMillisecond<
    T extends "weak" | "normal" | "strong" | "branded" | `${number}` = "normal"
> =
T extends "weak"
    ? `${number}`
: T extends "normal"
    ? `${NumericChar}${number}`
: T extends "strong"
    ? `${NumericChar}${NumericChar}${NumericChar}`
: T extends "branded"
    ? Brand<`${number}`, "ThreeDigitMillisecond">
: T extends `${number}`
    ? T extends ThreeDigitMillisecond<"strong">
        ? Brand<T,"ThreeDigitMillisecond">
        : Err<
            `invalid-type/ms`,
            `The type passed into 'ThreeDigitMillisecond<${T}>' is not valid!`,
            { ms: T }
        >
: never;

/**
 * **TwoDigitMonth**`<normal|weak|branded>`
 *
 * - uses the `normal` variant by default which provides self-validating
 * type structure to the month
 * - if you need to preserve type strength you can opt for `weak` variant
 * - if you've validated the month with another utility you can move back
 * to a relatively weak "type" which is "branded"
 */
export type TwoDigitMonth<
    T extends "normal" | "weak" | "branded" | `${number}` = "normal"
> =
    T extends "normal"
        ? (`0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`) & `${number}`
    : T extends "weak"
        ? `${"0" | "1"}${number}` & `${number}`
    : T extends "branded"
        ? Brand<`${number}`, "TwoDigitMonth">
    : T extends `${number}`
        ? [IsTwoDigitMonth<T>] extends [true]
            ? Brand<T, "TwoDigitMonth">
            : Err<
                `invalid-type/month`,
                `The type passed into 'TwoDigitMonth<${T}>' is not a valid two digit month!`,
                { month: T }
            >
        : never;

/**
 * a union of valid month numbers
 */
export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * **TwoDigitDate**`<weak | NORMAL | branded>`
 *
 * Provides a type shape for a two digit date found in ISO Date and DateTime strings.
 *
 * - the `normal` variant provides strong type support but is not _self-validating_
 * - the `weak` variant keeps some guard rails and is useful when you need to be
 * judicious with type strength
 * - the `branded` variant is to be used when you have validated through another utility
 * that this date is valid; this means:
 *   - valid in isolation (aka, a potentially valid number)
 *   - valid based on month (aka, fits into the max number of days in the month)
 *   - valid based on whether it's a leap year or not
 * - Note: the _branded_ variant is intentionally not super strong on "type" because
 * it's brand ensures other utilities will know it's validated.
 */
export type TwoDigitDate<
    T extends "weak" | "normal" | "branded" | `${number}` = "normal"
> =
T extends "normal"
        ?
    | `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `1${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `2${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | `3${0 | 1}`

: T extends "weak"
    ?
    | `0${number}`
    | `1${number}`
    | `2${number}`
    | `3${number}`
: T extends "branded"
    ? Brand<`${number}`, "TwoDigitDate">
: T extends `${number}`
    ? T extends TwoDigitDate<"normal">
        ? Brand<T, "TwoDigitDate">
        : Err<
            `invalid-type/date`,
            `The type passed into TwoDigitDate<${T}> is not valid!`,
            { dte: T }
        >
    : never;

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
 * **FourDigitYear**`<["weak"|"NORMAL"|"strong"|"branded"]>`
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
 * - you may also opt for `branded` which indicates that it has been
 * validated to be `FourDigitYear<"strong">` but the typescript type
 * is reduced to just `${number}`
 * - if you use a numeric value for `T` it will will intersect `T`
 * with the branded type.
 */
export type FourDigitYear<
    T extends "strong" | "normal" | "weak" | "branded" | `${number}` = "normal"
> = T extends "strong"
    ? (
        | `${"1" | "2"}${NumericChar}${NumericChar}${NumericChar}`
        | `${"0" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}${number}`
    ) & `${number}`
    : T extends "normal"
        ? (`${"1" | "2"}${NumericChar}${number}`
        | `${"0" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}${number}`
    ) & `${number}`
        : T extends "weak"
            ? `${NumericChar}${number}` & `${number}`
            : T extends "branded"
                ? Brand<`${number}`, "FourDigitYear">
            : T extends `${number}`
                ? IsFourDigitYear<T> extends true
                    ? Brand<T, "FourDigitYear">
                    : Err<
                        `invalid-type/four-digit-year`,
                        `The type passed into 'FourDigitYear<${T}>' is not a valid four digit year so a Branded type can not be produced!`,
                        { year: T }
                    >
                    : never;

export type TimeZoneExplicit = | `Z`
    | `${"+" | "-"}${TwoDigitHour}`
    | `${"+" | "-"}${TwoDigitHour}:${number}`;

/**
 * **TimezoneOffset**`<[strong | NORMAL | explicit | implicit | branded ]`>
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
 * - if you know that when the _minutes_ are provided the "explicit" format with
 * the ":" will be use you can get self-validating from `explicit` with a smaller
 * union type
 * - similarly if you KNOW the `implicit` format with minutes will be used you
 * can use `implicit`
 * - if you have validate this string using another utility you can opt for `branded`
 * which is equivalent to the "normal" type structure but other utilities will
 * respect the branded type as validated.
 */
export type TimezoneOffset<
    T extends "strong" | "normal" | "explicit" | "implicit" | "branded" | `${"Z" | "+" | "-"}${string}` = "normal"
> =
    T extends "normal"
        ? | `Z`
    | `${"+" | "-"}${number}`
    | `${"+" | "-"}${number}${number}`
    | `${"+" | "-"}${number}:${number}`
        : T extends "strong"
            ?
    | `Z`
    | `${"+" | "-"}${TwoDigitHour}`
    | `${"+" | "-"}${TwoDigitHour}${TwoDigitMinute}`
    | `${"+" | "-"}${TwoDigitHour}:${TwoDigitMinute}`
            : T extends "explicit"
                ?
    | `Z`
    | `${"+" | "-"}${TwoDigitHour}`
    | `${"+" | "-"}${TwoDigitHour}:${TwoDigitMinute}`
                : T extends "implicit"
                    ?
    | `Z`
    | `${"+" | "-"}${TwoDigitHour}`
    | `${"+" | "-"}${TwoDigitHour}${TwoDigitMinute}`
                    : T extends "branded"
                        ? Brand<(
        | `Z`
        | `${"+" | "-"}${number}`
        | `${"+" | "-"}${number}${number}`
        | `${"+" | "-"}${number}:${number}`
    ), "TimezoneOffset">
    : T extends `${"Z" | "+" | "-"}${string}`
        ? T extends TimezoneOffset<"strong">
            ? Brand<T, "TimezoneOffset">
            : never
        : never
    ;
