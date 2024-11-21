import { isNumber } from "./isNumber";


/**
 * Type guard which validates that the passed in `val` is a string array.
 */
export const isNumericArray = (val: unknown): val is number[] => {
  return Array.isArray(val) && val.every(i => isNumber(i));
}
