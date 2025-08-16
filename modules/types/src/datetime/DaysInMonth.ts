import {
    As,
    AsTwoDigitMonth,
    DateLike,
    Err,
    GetMonthNumber,
    MonthAbbrev,
    MonthName,
    ParseDate,
    ParsedDate,
    TwoDigitMonth,
    Unbrand,
    FourDigitYear,
    IsBetweenInclusively,
    IsLeapYear,
    IsUndefined,
    IsDoubleLeap,
    IsInteger,
    AsFourDigitYear,
    NumberLike,
    IsoDate30
} from "inferred-types/types";

type CalcFeb<T extends NumberLike | undefined> = IsUndefined<T> extends true
? 28
: AsFourDigitYear<T> extends FourDigitYear
    ? IsLeapYear<T> extends true
        ? IsDoubleLeap<T> extends true
            ? 30
            : 29
    : 28
: ParseDate<T> extends ParsedDate
    ? ParseDate<T>[0] extends infer Year extends FourDigitYear
        ? IsLeapYear<Unbrand<Year>> extends true
            ? IsDoubleLeap<Unbrand<Year>> extends true
                ? 30
                : 29
        : 28
    : Err<
        `invalid-year/missing`,
        `The utility DaysInMonth<T,[Y]> was passed a value for Y and though it was parsed as a date, the year information was invalid!`,
        { T:T, utility: "DaysInMonth"}
    >
: Err<
    `invalid-year/parse`,
    `The utility DaysInMonth<T,[Y]> was passed a value for Y but it was unable to be parsed into a valid year!`,
    { T:T, utility: "DaysInMonth"}
>;


type Days<
    T extends TwoDigitMonth | number,
    Y extends NumberLike | undefined = undefined,
> = Unbrand<T> extends "02" | 2
? CalcFeb<Y>
: AsTwoDigitMonth<T> extends IsoDate30
    ? 30
    : 31;


type IsNumericMonthIndex<T> = T extends number
? number extends T
    ? false
: IsInteger<T> extends true
    ? IsBetweenInclusively<T,1,12>
    : false
: false;

/**
 * **DaysInMonth**`<T,[Y]>`
 *
 * Converts the month represented by `T` into the number days in the month.
 *
 * - Month Representation
 *     - You can pass in a `DateLike` value for `T` and as long as it has a
 *     month representation it will be used to calculate the days of the month
 *     - You can also pass in a month name (e.g., "January", "February", etc.)
 *     - You can also pass in a month abbreviation (e.g., "Jan", "Feb", etc.)
 *     - You can also pass in a two digit month number (e.g., 01, 02, etc.)
 *     - You can also pass in a numeric value between 1 and 12
 *
 * - Leap Year (and double leap)
 *     - if `T` has month and _year_ info then leap years and double leap years
 * will be considered for February.
 *     - if `T` is missing _year_ info but `Y` (as a valid year) is provided then
 *     leap and double leap will be considered as well
 *     - in other situations leap year can not be calculated and therefore
 *     February will always return 28.
 */
export type DaysInMonth<
    T,
    Y extends FourDigitYear | number | undefined = undefined
> = As<
T extends number
? number extends T
    ? 28 | 29 | 30 | 31 | Error
    : IsNumericMonthIndex<T> extends true
        ? DaysInMonth<AsTwoDigitMonth<T>, Y>
        : Err<`a`>
: string extends T
    ? 28 | 29 | 30 | 31 | Error
: T extends TwoDigitMonth
    ? Unbrand<Y> extends NumberLike
        ? Days<Unbrand<T>, Unbrand<Y>>
        : Days<Unbrand<T>>
: T extends DateLike
    ? ParseDate<T> extends ParsedDate
        ? ParseDate<T>[1] extends infer Month extends TwoDigitMonth
            ? ParseDate<T>[0] extends infer Year extends FourDigitYear
                ? Days<Unbrand<Month>, Unbrand<Year>>
                : Unbrand<Y> extends NumberLike
                    ? Days<Unbrand<Month>, Unbrand<Y>>
                    : Days<Unbrand<Month>>
        : Err<`invalid-month/missing`>
    : ParseDate<T> extends Error
        ? Err<
            `invalid-month/parsing`,
            `The generic T passed to DaysInMonth<T,[Y]> was date-like but when parsing produced the following error: ${ParseDate<T>["message"]}`,
            { T: T, utility: "DaysInMonth" }
        >
    : Err<
        `invalid-month/parsing`,
        `The generic T passed to DaysInMonth<T,[Y]> was date-like but when parsing it did not produce a ParsedDate or an Error (this should not happen)!`,
        { T: T, utility: "DaysInMonth" }
    >
: T extends MonthName
    ? GetMonthNumber<T> extends number
        ? Unbrand<Y> extends NumberLike
            ? Days<GetMonthNumber<T>, Unbrand<Y>>
            : Days<GetMonthNumber<T>>
    : Err<
        `invalid-month/name`,
        `The generic T passed to DaysInMonth<T,[Y]> extends MonthName but GetMonthNumber<T> was unable to convert it to a number! This should not happen.`,
        { T: T, utility: "DaysInMonth"}
    >
: T extends MonthAbbrev
    ? GetMonthNumber<T> extends number
        ? Unbrand<Y> extends NumberLike
            ? Days<GetMonthNumber<T>, Unbrand<Y>>
            : Days<GetMonthNumber<T>>
    : Err<
        `invalid-month/abbrev`,
        `The generic T passed to DaysInMonth<T,[Y]> extends MonthAbbrev but GetMonthNumber<T> was unable to convert it to a number! This should not happen.`,
        { T: T, utility: "DaysInMonth"}
    >
: Err<
    `invalid-month/type`,
    `The generic T passed to DaysInMonth<T,[Y]> was not a type in which a month could be extracted!`,
    { T: T, utility: "DaysInMonth" }
>,
number | Error>;
