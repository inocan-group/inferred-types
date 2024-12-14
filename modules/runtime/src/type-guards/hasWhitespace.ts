import { WHITESPACE_CHARS } from "inferred-types/constants";
import { asChars } from "../type-conversion";
import { isString } from "./isString";

/**
 * **hasWhiteSpace**`(val)`
 *
 * Type guard which checks whether a string has a any whitespace characters in it
 */
export function hasWhiteSpace<T>(val: T): val is T {
  return isString(val) && asChars(val).some(c => WHITESPACE_CHARS.includes(c as any));
}