import type { MonthName } from "inferred-types/types";
import { MONTH_NAME } from "inferred-types/constants";
import { isString } from "runtime/type-guards";

/**
 * type guard which validates that `val` is the name of
 * a month.
 *
 * **Related:** `isMonthAbbrev()`
 */
export function isMonthName(val: unknown): val is MonthName {
    return isString(val) && MONTH_NAME.includes(val as any);
}
