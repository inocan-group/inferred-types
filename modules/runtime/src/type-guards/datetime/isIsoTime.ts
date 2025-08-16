import type { IsoDate } from "inferred-types/types";
import { stripAfter, stripLeading } from "runtime/string-literals";
import { isString } from "runtime/type-guards";

export function isIsoExplicitTime(val: unknown): val is IsoDate {
    if (isString(val)) {
        const parts = stripLeading(stripAfter(val, "Z"), "T").split(/[:.]/).map(i => Number(i));
        return val.startsWith("T") && val.includes(":") && val.split(":").length === 3 && parts[0] >= 0 && parts[0] <= 23 && parts[1] >= 0 && parts[1] <= 59;
    }
    else {
        return false;
    }
}

export function isIsoImplicitTime(val: unknown): val is IsoDate {
    if (isString(val)) {
        const parts = stripAfter(val, "Z").split(/[:.]/).map(i => Number(i));
        return val.includes(":") && val.split(":").length === 3 && parts[0] >= 0 && parts[0] <= 23 && parts[1] >= 0 && parts[1] <= 59;
    }
    else {
        return false;
    }
}

/**
 * Type guard which validates that the passed in `val` is a valid ISO-8601 time.
 */
export function isIsoTime(val: unknown): val is IsoDate {
    return isIsoExplicitTime(val) || isIsoImplicitTime(val);
}
