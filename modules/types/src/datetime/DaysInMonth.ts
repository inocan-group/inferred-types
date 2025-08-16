import { ISO_DATE_30 } from "inferred-types/constants";
import { IsBetweenInclusively } from '../numeric-literals/IsBetween';
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
    Contains,
    IsNull,
    FourDigitYear,
    IsLeapYear,
    IsUndefined,
    IsTrue,
    IsDoubleLeap,
    IsInteger,
    IsFourDigitYear
} from "inferred-types/types";


type Days<
    T extends TwoDigitMonth | number,
    Y extends FourDigitYear | undefined = undefined,
    U extends TwoDigitMonth | number = T extends number
        ? AsTwoDigitMonth<T> extends infer Month extends TwoDigitMonth
            ? Month
            : never
        : As<Unbrand<T>, TwoDigitMonth>,
    TLeap extends boolean | null = IsUndefined<Y> extends true
        ? null
        : Y extends FourDigitYear
            ? IsLeapYear<Y> extends Error
                ? null
            : As<IsLeapYear<T>, boolean>
            : never
> = U extends "02"
? IsNull<TLeap> extends true
    ? 28
    : IsTrue<TLeap> extends true
        ? IsDoubleLeap<As<Y, FourDigitYear>> extends true
            ? 30
            : 29
        : 28
: U extends number
    ? Contains<typeof ISO_DATE_30, AsTwoDigitMonth<U>> extends true
        ? 30
        : 31

    : Contains<typeof ISO_DATE_30, U> extends true
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
> = T extends DateLike
? IsNumericMonthIndex<T> extends true
    ? IsUndefined<Y> extends true
        ? Days<As<T, number>>
    : IsFourDigitYear<Y> extends true
        ? Days<As<T,number>, As<Y,FourDigitYear>>
    : Y extends number
        ? AsFourDigitYear<Y>
    : Err<
        `invalid-year/days-in-month`,
        `A value was passed in as a year into DaysInMonth<T,[Y]> but it was neither a FourDigitYear string literal or a number!`,
        { T: T, Y: Y }
    >

: ParseDate<T> extends Error
    ? Err<
        `invalid-date/days-in-month`,
        `The DaysInMonth<T> utility tried to parse T as a date but it failed!`,
        { T: T }
    >
: ParseDate<T> extends ParsedDate
    ? ParseDate<T>[1] extends infer Month extends TwoDigitMonth
        ? ParseDate<T>[0] extends infer Year extends FourDigitYear
            ? Days<Month, Year>
            : IsUndefined<Y> extends true
                ? Days<Month>
                : Days<Month, As<Y, FourDigitYear>>
        : Err<
            `unknown-month/days-in-month`,
            `The DaysInMonth<T> utility got a valid date like value but it does not contain information about the month!`,
            { T:T, month: ParseDate<T>[1]}
        >
    : Err<
        `invalid-date/days-in-month`,
        `An error occurred trying to parse T as a DateLike representation in the DaysInMonth<T> utility`,
        { T: T }
    >
: T extends MonthName
    ? IsUndefined<Y> extends true
        ? Days<As<GetMonthNumber<T>, number>>
        : Days<As<GetMonthNumber<T>, number>, As<Y,FourDigitYear>>
: T extends MonthAbbrev
    ? IsUndefined<Y> extends true
        ? Days<As<GetMonthNumber<T>, number>>
        : Days<As<GetMonthNumber<T>, number>, As<Y,FourDigitYear>>
: T extends TwoDigitMonth
    ? IsUndefined<Y> extends true
        ? Days<T>
        : Days<T, As<Y,FourDigitYear>>
: Err<
    `invalid-date/days-in-month`,
    `The DaysInMonth<T> utility expects T to be 'DateLike' or either the name of a month or an abbreviated name of a month but it was unable to be parsed into a date or month name!`,
    { T: T }
>;
