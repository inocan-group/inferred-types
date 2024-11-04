import { Scalar } from "src/types/index";
import { isString } from "./isString";
import { isNumber } from "./isNumber";
import { isSymbol } from "./isSymbol";
import { isNull } from "./isNull";



/**
 * **isScalar**(value)
 * 
 * Type guard to check whether the value passed in is a _scalar_ value.
 */
export function isScalar<T>(value: T): value is T & Scalar {
  return isString(value) || isNumber(value) || isSymbol(value) || isNull(value);

}
