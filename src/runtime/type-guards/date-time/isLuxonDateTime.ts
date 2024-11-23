import { LuxonJs } from "src/types/index"
import { isObject } from "src/runtime/index"

/**
* Type guard which validates that the passed in `val` is a
* [LuxonJS](https://moment.github.io/luxon/#/?id=luxon) DateTime object.
*/
export const isLuxonDateTime = (val: unknown): val is LuxonJs["DateTime"] => {
  return isObject(val) &&
    typeof val === "object" &&
    val !== null &&
    "isValid" in val &&
    "invalidReason" in val &&
    "invalidExplanation" in val &&
    "toISO" in val &&
    "toFormat" in val &&
    "toMillis" in val &&
    "year" in val &&
    "month" in val &&
    "day" in val &&
    "hour" in val &&
    "minute" in val &&
    "second" in val &&
    "millisecond" in val &&
    typeof (val as any).isValid === "boolean" &&
    typeof (val as any).toISO === "function"
}
