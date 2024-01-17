import { Scalar } from "src/types/index";
import { isNull, isNumber, isString, isSymbol } from "src/runtime/index";


/**
 * **isScalar**(value)
 * 
 * Type guard to check whether the value passed in is a _scalar_ value.
 */
export function isScalar<T>(value: T): value is T & Scalar {
  return isString(value) || isNumber(value) || isSymbol(value) || isNull(value);

}
