import type {
    FourDigitYear,
    IsoDateTimeLike,
    NumericChar,
    ParseDate,
    ParsedDate,
    ParsedTime,
    TwoDigitMinute,
    TwoDigitMonth
} from "inferred-types/types";

/**
 * **IsIso8601DateTime**`<T>`
 *
 * boolean operator which test whether `T` is a valid ISO 8601 DateTime string.
 */
export type IsIsoDateTime<T> = T extends IsoDateTimeLike
    ? ParseDate<T> extends [
        FourDigitYear,
        TwoDigitMonth,
        TwoDigitMinute,
        ParsedTime
    ]
        ? true
        : ParseDate<T> extends [
            null,
            TwoDigitMonth,
            TwoDigitMinute,
            ParsedTime
        ]
            ? true
        : ParseDate<T> extends [
            FourDigitYear,
            TwoDigitMonth,
            null,
            ParsedTime
        ]
            ? true
        : false
    : false;


/**
 * **IsIsoYearMonthTime**
 *
 * A boolean operator which tests whether `T` is ISO DateTime
 * which specifies year and month but not date.
 *
 * **Related:** `IsIsoYearMonth`
 */
export type IsIsoYearMonthTime<T> =  T extends `-${NumericChar}${string}T${string}`
    ? ParseDate<T> extends [
            FourDigitYear,
            TwoDigitMonth,
            null,
            ParsedTime
        ]
            ? true
        : false
: false;

/**
 * **IsIsoMonthDateTime**
 *
 * A boolean operator which tests whether `T` is ISO DateTime
 * which specifies month and date but not year.
 *
 * **Related:** `IsIsoMonthDate`
 */
export type IsIsoMonthDateTime<T> = T extends `--${string}T${string}`
    ? ParseDate<T> extends [
            null,
            TwoDigitMonth,
            TwoDigitMinute,
            ParsedTime
        ]
            ? true
        : false
    : false;
