import type { EmptyObject } from "types/base-types";
import type { IsEqual } from "types/boolean-logic";
import type {
    IsIsoFullDate,
    IsIsoMonthDate,
    IsIsoYear,
    IsIsoYearMonth
} from "types/boolean-logic/operators/datetime";
import type { IsNull } from "types/boolean-logic/operators/scalar/IsNull";
import type { IsoDate } from "types/datetime";

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
export type IsIsoDate<T> = IsNull<T> extends true
    ? false
    : IsEqual<T, EmptyObject> extends true
        ? false
        : string extends T
            ? boolean
            : T extends IsoDate<"branded">
                ? true
                : T extends IsoDate<"normal">
                    ? IsIsoFullDate<T> extends true //
                        ? true
                        : IsIsoYearMonth<T> extends true
                            ? true
                            : IsIsoMonthDate<T> extends true
                                ? true
                                : IsIsoYear<T> extends true
                                    ? true
                                    : false
                    : false;
