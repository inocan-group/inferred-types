import type { AlphaChar, Narrowable } from "inferred-types/types";
import { ALPHA_CHARS } from "inferred-types/constants";
import { asChars, isString } from "inferred-types/runtime";

/**
 * **isAlpha**(value)
 *
 * Type guard which ensures that the given value is a string literal with only
 * alphabetic characters.
 */
export function isAlpha<T extends Narrowable>(value: T): value is T & AlphaChar {
    return isString(value) && asChars(value).every(v => ALPHA_CHARS.includes(v as AlphaChar));
}
