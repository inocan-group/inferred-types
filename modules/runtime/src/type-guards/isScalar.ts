import type { Scalar } from "inferred-types/types";
import { isNull } from "./isNull";
import { isNumber } from "./isNumber";
import { isString } from "./isString";
import { isSymbol } from "./isSymbol";

/**
 * **isScalar**(value)
 *
 * Type guard to check whether the value passed in is a _scalar_ value.
 */
export function isScalar<T>(value: T): value is T & Scalar {
  return isString(value) || isNumber(value) || isSymbol(value) || isNull(value);
}
