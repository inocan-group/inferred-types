import type { LuxonLikeDateTime } from "inferred-types/types";
import { isDictionary } from "runtime/type-guards";

/**
 * Type guard which validates that the passed in `val` is a
 * [LuxonJS](https://moment.github.io/luxon/#/?id=luxon) DateTime object.
 */
export function isLuxonDate(val: unknown): val is LuxonLikeDateTime {
    return isDictionary(val)
        && typeof val === "object"
        && val !== null
        && "isValid" in val
        && "invalidReason" in val
        && "invalidExplanation" in val
        && "toISO" in val
        && "toFormat" in val
        && "toMillis" in val
        && "year" in val
        && "month" in val
        && "day" in val
        && "hour" in val
        && "minute" in val
        && "second" in val
        && "millisecond" in val
        && "zoneName" in val
        && typeof (val as any).isValid === "boolean"
        && typeof (val as any).toISO === "function"
        && typeof (val as any).zoneName === "string";
}
