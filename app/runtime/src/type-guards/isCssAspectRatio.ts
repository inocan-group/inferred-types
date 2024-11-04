import { CssAspectRatio } from "@inferred-types/types";
import { isString } from "./isString";

const tokens = [
  "1", "inherit", "initial", "revert", "revert-layer", "unset", "auto"
]

const isRatio = (val: string) => /[0-9]{1,4}\s*\/\s*[0-9]{1,4}/.test(val)

/**
 * Type guard which tests whether the passed in value is a valid CSS Aspect
 * Ratio value.
 */
export const isCssAspectRatio = <T>(val: T): val is T & CssAspectRatio => {
  return isString(val) && val.split(/\s+/).every(i => tokens.includes(i) || isRatio(i))
}
