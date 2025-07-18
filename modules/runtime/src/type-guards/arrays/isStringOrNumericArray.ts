import { isNumber } from "runtime/type-guards/numeric/isNumber";
import { isString } from "runtime/type-guards/isString";

/**
 * Type guard which validates that the passed in `val` is an array of
 * string or numeric values.
 */
export function isStringOrNumericArray(val: unknown): val is readonly (string | number)[] {
    return Array.isArray(val) && val.every(i => isString(i) || isNumber(i));
}
