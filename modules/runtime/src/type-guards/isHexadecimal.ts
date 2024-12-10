import { asChars } from "../type-conversion/asChars";
import { isNumericString } from "./isNumericString";
import { isString } from "./isString";

/**
 * **isHexadecimal**`(val)`
 *
 * Type guard which checks whether all of the characters in the given string
 * are hexadecimal characters.
 */
export function isHexadecimal<T>(val: T): val is T {
  return isString(val)
    && asChars(val).every(i => isNumericString(i) || ["a", "b", "c", "d", "e", "f"].includes(i.toLowerCase()));
}
