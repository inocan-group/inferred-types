import { MomentJs } from "inferred-types/types"
import { isObject } from "inferred-types/runtime"

/**
* Type guard which validates that the passed in `val` is a
* [MomentJS](https://momentjs.com/docs/) object.
*/
export const isMoment = (val: unknown): val is MomentJs => {
  if (val instanceof Date) {
    return false;
  }
  return isObject(val) &&
    // Check for essential Moment.js methods
    typeof val.format === "function" &&
    typeof val.year === "function" &&
    typeof val.month === "function" &&
    typeof val.date === "function" &&
    // Check for Moment-specific properties
    "_isAMomentObject" in val &&
    "_isValid" in val &&
    // Check for essential Moment.js manipulation methods
    typeof val.add === "function" &&
    typeof val.subtract === "function" &&
    // Additional Moment.js specific methods
    typeof val.toISOString === "function" &&
    typeof val.isValid === "function";
};
