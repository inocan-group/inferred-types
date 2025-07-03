import type {
    IsIsoFullDate,
    IsIsoYearMonth,
    IsIsoMonthDate,
    IsoDateLike,
    IsIsoYear,
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
    ? IsIsoFullDate<T> extends true
        ? true
    : IsIsoYearMonth<T> extends true
        ? true
    : IsIsoMonthDate<T> extends true
        ? true
    : IsIsoYear<T> extends true
        ? true
    : false
: false;


