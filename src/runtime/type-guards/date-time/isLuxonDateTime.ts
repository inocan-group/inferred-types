import { LuxonJS } from "src/types/index"
import { isObject } from "src/runtime/index"

/**
* Type guard which validates that the passed in `val` is a
* [LuxonJS](https://moment.github.io/luxon/#/?id=luxon) DateTime object.
*/
export const isLuxonDateTime = (val: unknown): val is LuxonJS["DateTime"] => {
  return isObject(val) &&
    "calendars" in val &&
    "fromMillis" in val &&
    "fromISO" in val &&
    "years" in val &&
    "months" in val &&
    "days" in val &&
    "hours" in val &&
    "minutes" in val &&
    "seconds" in val &&
    "milliseconds" in val &&
    "toISO" in val &&
    "toFormat" in val &&
    "toMillis" in val &&
    "plus" in val &&
    "minus" in val &&
    "set" in val &&
    "isValid" in val &&
    "invalid" in val &&
    "invalidReason" in val &&
    "isInLeapYear" in val &&
    "isInDST" in val &&
    "offsetName" in val
}
