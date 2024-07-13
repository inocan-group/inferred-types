import { LikeRegExp } from "src/types/index";
import { isString } from "./isString"

/**
 * Type guard that validates the the value passed in is
 * a regular expression.
 *
 * **Related:** `isLikeRegExp`
 */
export const isRegExp = (val: unknown): val is RegExp => {
  return val instanceof RegExp
}


/**
 * Type guard that validates the the value passed in is
 * a regular expression or a string that _can_ be turned
 * into a regular expression.
 *
 * **Related:** `isRegExp`
 */
export const isLikeRegExp = (val: unknown): val is LikeRegExp => {
  if (isRegExp(val)) {
    return true;
  }

  if (isString(val)) {
    try {
      const re = new RegExp(val);
      return true
    } catch(e) {
      return false
    }
  }

  return false
}
