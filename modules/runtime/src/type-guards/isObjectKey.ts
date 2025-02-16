import type { ObjectKey } from "inferred-types/types";
import { isString, isSymbol } from "inferred-types/runtime";

/**
 * Type guard which validates that `val` is a valid `ObjectKey`
 */
export function isObjectKey(val: unknown): val is ObjectKey {
  return isString(val) || isSymbol(val);
}
