import type { ObjectKey } from "inferred-types/types";
import { isString } from "./isString";
import { isSymbol } from "./isSymbol";

/**
 * Type guard which validates that `val` is a valid `ObjectKey`
 */
export function isObjectKey(val: unknown): val is ObjectKey {
  return isString(val) || isSymbol(val);
}
