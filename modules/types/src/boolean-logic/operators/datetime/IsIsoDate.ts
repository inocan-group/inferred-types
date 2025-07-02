import type {
    FourDigitYear,
    IsoDateLike,
    IsoYearMonthLike,
    IsStringLiteral,
    IsWideString,
    Length,
    Or,
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
 *  - `--MM-DD` or `--MMDD` - _for year-independent dates_
 *  - `-YYYY-DD` or `-YYYYDD` - _for year-month resolution with specific date_
 *
 * **Note:** this _does not_ match on DateTime combinations; use `IsIsoDateTime`
 * for that.
 */
export type IsIsoDate<T> = T extends IsoDateLike
    ? Or<[]>
    : false;


