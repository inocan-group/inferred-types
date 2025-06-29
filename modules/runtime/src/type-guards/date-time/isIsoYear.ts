import type { IsoYear } from "inferred-types/types";
import { isNumber, isString } from "inferred-types/runtime";

/**
 * A type guard which matches a valid ISO 8601 year (e.g., `YYYY`).
 */
export function isIsoYear(val: unknown): val is IsoYear {
    return !!(isString(val)
        && val.length === 4
        && isNumber(Number(val))
        && Number(val) >= 0
        && Number(val) <= 9999);
}
