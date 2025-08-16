import type { DayJsLike } from "inferred-types/types";
import { isDictionary } from "runtime/type-guards";

/**
 * Type guard to detect whether the `val` passed in is a `Day.js` date
 * object.
 */
export function isDayJs(val: unknown): val is DayJsLike {
    if (
        isDictionary(val)
        && "toDate" in val
        && typeof val.toDate === "function"
        && "subtract" in val
        && "utc" in val
    ) {
        try {
            return val.toDate() instanceof Date;
            return true;
        }
        catch {
            return false;
        }
    }
    return false;
}
