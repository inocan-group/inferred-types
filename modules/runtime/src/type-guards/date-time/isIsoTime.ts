import type { Iso8601Time } from "inferred-types/types";
import { isString, stripAfter, stripLeading } from "inferred-types/runtime";

export function isIsoExplicitTime(val: unknown): val is Iso8601Time<"explicit"> {
  if (isString(val)) {
    const parts = stripLeading(stripAfter(val, "Z"), "T").split(/[:.]/).map(i => Number(i));
    return val.startsWith("T") && val.includes(":") && val.split(":").length === 3 && parts[0] >= 0 && parts[0] <= 23 && parts[1] >= 0 && parts[1] <= 59;
  }
  else {
    return false;
  }
}

export function isIsoImplicitTime(val: unknown): val is Iso8601Time<"implicit"> {
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
export function isIsoTime(val: unknown): val is Iso8601Time<"both"> {
  return isIsoExplicitTime(val) || isIsoImplicitTime(val);
}
