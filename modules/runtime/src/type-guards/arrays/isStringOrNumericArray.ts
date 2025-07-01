import { isNumber, isString } from "inferred-types/runtime";

/**
 * Type guard which validates that the passed in `val` is an array of
 * string or numeric values.
 */
export function isStringOrNumericArray(val: unknown): val is readonly (string | number)[] {
    return Array.isArray(val) && val.every(i => isString(i) || isNumber(i));
}
