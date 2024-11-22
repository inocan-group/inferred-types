import { MomentJs } from "src/types/index"
import { isObject } from "src/runtime/index"

/**
* Type guard which validates that the passed in `val` is a
* [MomentJS](https://momentjs.com/docs/) object.
*/
export const isMoment = (val: unknown): val is MomentJs => {
  return isObject(val) &&
    "toISOString" in val &&
    "calendar" in val &&
    "dayOfYear" in val &&
    "invalidDate" in val &&
    !("set" in val)
}
