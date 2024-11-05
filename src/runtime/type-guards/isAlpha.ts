import { Alpha, AlphaChar, Narrowable } from "src/types/index";
import { ALPHA_CHARS } from "inferred-types/dist/constants/index";
import { isString, split } from "src/runtime/index";

/**
 * **isAlpha**(value)
 *
 * Type guard which ensures that the given value is a string literal with only
 * alphabetic characters.
 */
export const isAlpha = <T extends Narrowable>(value: T): value is T & Alpha<T> => {
  return isString(value) && split(value).every(v => ALPHA_CHARS.includes(v as AlphaChar));
};
