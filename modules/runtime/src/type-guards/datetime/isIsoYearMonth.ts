import { isString } from "inferred-types/runtime";
import { IsoYearMonthLike } from "inferred-types/types"

/**
 * type-guard which validates whether this
 */
export function isIsoYearMonth(date: unknown): date is IsoYearMonthLike {
    return isString(date)
        && date.startsWith("-")
        && date.replace(/-\d{4}-{0,1}[01]{1}\d{1}/, "") === ""
}


