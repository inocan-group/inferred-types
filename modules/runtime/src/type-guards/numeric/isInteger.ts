import type { Integer } from "inferred-types/types";
import { isNumber } from "./isNumber";

/**
 * type guard which validates that `val` is a `number` type which is
 * also a valid Integer number.
 */
export function isInteger(val: unknown): val is Integer {
  return isNumber(val) && Number.isInteger(val);
}
