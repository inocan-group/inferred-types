import { isString } from "./isString";

/**
 * Type guard which validates that the passed in `val` is a string array.
 */
export const isStringArray = (val: unknown): val is string[] => {
  return Array.isArray(val) && val.every(i => isString(i));
}
