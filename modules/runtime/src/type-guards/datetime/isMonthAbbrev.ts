import { MONTH_ABBR } from "inferred-types/constants";
import { MonthAbbrev } from "inferred-types/types";
import { isString } from "runtime/type-guards/index";

/**
 * type guard which validates that `val` is the name of
 * a month.
 *
 * **Related:** `isMonthName()`
 */
export function isMonthAbbrev(val: unknown): val is MonthAbbrev {
    return isString(val) && MONTH_ABBR.includes(val as any);
}
