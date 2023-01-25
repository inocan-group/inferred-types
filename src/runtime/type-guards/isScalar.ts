import { Scalar } from "types/Scalar";
import { isTypeOf } from "./higher-order/isTypeOf";

/**
 * **isScalar**(value)
 * 
 * Type guard to check whether the value passed in is a _scalar_ value.
 */
export function isScalar<T>(value: T): value is T & Scalar {
  return isTypeOf("string", value) || isTypeOf("number", value) || isTypeOf("bigint", value) || isTypeOf("symbol", value) || value === null;
}
