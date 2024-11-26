import { Iso8601DateTime } from "inferred-types/types";
import { isNumberLike, isString, stripUntil, } from "inferred-types/runtime";

/**
 * Type guard which validates that `val` is a valid ISO8601 DateTime string.
 */
export const isIsoDateTime = (val: unknown): val is Iso8601DateTime => {
  if (isString(val)) {
    return val.includes(":") &&
      val.includes("-") &&
      val.split("-").length === 3 &&
      val.split(":").length > 1 &&
      (!val.includes("Z") || isNumberLike(val.slice(-1)) || val.endsWith("Z")) &&
      (!val.includes("Z") || ["+","-"].includes(stripUntil(val, "Z").slice(1,2)) || val.endsWith("Z"))
  }

  return false;
}
