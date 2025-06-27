import type { Scalar } from "inferred-types/types";
import { isFalse, isNull, isNumber, isString, isSymbol, isTrue } from "inferred-types/runtime";

/**
 * **isScalar**(value)
 *
 * Type guard to check whether the value passed in is a _scalar_ value.
 */
export function isScalar<T>(value: T): value is T & Scalar {
    return isString(value) || isNumber(value) || isSymbol(value) || isNull(value) || isTrue(value) || isFalse(value);
}
