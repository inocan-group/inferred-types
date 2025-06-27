import type {
    FourDigitYear,
    IsoDateLike,
    IsoYearMonthLike,
    IsStringLiteral,
    IsWideString,
    Length,
    ParseDate,
    ParsedDate,
    TwoDigitDate,
} from "inferred-types/types";

/**
 * **IsIsoDate**`<T>`
 *
 * Boolean operator which returns `true` when `T` is a valid ISO 8601 date string of the
 * format:
 *
 *  - `YYYY-MM-DD`,
 *  - `--MM-DD` - _for year-independent dates_
 */
export type IsIsoDate<T> = T extends IsoDateLike
    ? ParseDate<T> extends Error
        ? false
        : true
    : false;

/**
 * Tests whether `T` is a valid ISO Date which captures year
 * and month but not date:
 *
 * - `-YYYY-MM` _or_ `-YYYYMM`
 *
 * **Related:** `IsIsoYearMonthTime`
 */
export type IsIsoYearMonth<T> = T extends IsoYearMonthLike
    ? IsWideString<T> extends true
        ? boolean
        : ParseDate<T> extends ParsedDate
            ? ParseDate<T> extends [ FourDigitYear, TwoDigitDate, null, any, any]
                ? true
                : false
            : false
    : false;

/**
 * Tests whether `T` is a valid **ISO Date** which captures month
 * and date but not year:
 *
 * - `-YYYY-MM` _or_ `-YYYYMM`
 *
 * **Related:** `IsIsoMonthDateTime`
 */
export type IsIsoMonthDate<T> = T extends IsoYearMonthLike
    ? IsWideString<T> extends true
        ? boolean
        : ParseDate<T> extends ParsedDate
            ? ParseDate<T> extends [ FourDigitYear, TwoDigitDate, null, any, any]
                ? true
                : false
            : false
    : false;

/**
 * Boolean operator which tests whether `T` is a ISO Year (
 * a four digit year)
 */
export type IsIsoYear<T> = IsStringLiteral<T> extends true
    ? T extends `${number}`
        ? Length<T> extends 4
            ? true
            : false
        : false
    : boolean;
