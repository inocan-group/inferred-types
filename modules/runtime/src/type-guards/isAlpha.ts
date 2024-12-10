import type { Alpha, AlphaChar, Narrowable } from "inferred-types/types";
import { ALPHA_CHARS } from "inferred-types/constants";
import { isString, split } from "inferred-types/runtime";

/**
 * **isAlpha**(value)
 *
 * Type guard which ensures that the given value is a string literal with only
 * alphabetic characters.
 */
export function isAlpha<T extends Narrowable>(value: T): value is T & Alpha<T> {
  return isString(value) && split(value).every(v => ALPHA_CHARS.includes(v as AlphaChar));
}
