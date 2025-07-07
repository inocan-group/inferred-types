import type { DateLike, IsoYearMonth } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * type-guard which validates whether this
 */
export function isIsoYearMonth(date: unknown): date is IsoYearMonth & DateLike {
    return isString(date)
        && date.startsWith("-")
        && date.replace(/-\d{4}-?[01]\d/, "") === "";
}
