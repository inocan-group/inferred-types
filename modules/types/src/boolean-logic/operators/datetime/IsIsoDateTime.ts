import type {
    FourDigitYear,
    IsIsoDate,
    NumericChar,
    ParseDate,
    ParsedDate,
    ParsedTime,
    TwoDigitDate,
    TwoDigitMonth
} from "inferred-types/types";

/**
 * **IsIso8601DateTime**`<T>`
 *
 * boolean operator which test whether `T` is a valid ISO 8601 DateTime string.
 */
export type IsIsoDateTime<T> = T extends `${string}T${string}`
    ? IsIsoDate<T> extends Error
        ? false
        : IsIsoDate<T> extends [
            FourDigitYear | null,
            TwoDigitMonth,
            TwoDigitDate | null,
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
    ? ParseDate<T> extends ParsedDate
        ? ParseDate<T>[5] extends ParsedTime
            ? true
            : false
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
    ? ParseDate<T> extends ParsedDate
        ? ParseDate<T>[5] extends ParsedTime
            ? true
            : false
        : false
    : false;
