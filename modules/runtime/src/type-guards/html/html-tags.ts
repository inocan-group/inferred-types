import { HTML_ATOMIC_TAGS, HTML_BLOCK_TAGS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

/**
 * tests whether the `val` passed in is the name of a valid
 * HTML block tag (e.g., "div", "span", etc.)
 */
export function isValidBlockTag(val: unknown): val is string {
  return isString(val) && HTML_BLOCK_TAGS.includes(val.toLowerCase() as any);
}

/**
 * test whetehr the `val` pass in is a the name of a valid HTML
 * atomic tag (e.g., "br", "meta", etc.)
 */
export function isValidAtomicTag(val: unknown): val is string {
  return isString(val) && HTML_ATOMIC_TAGS.includes(val.toLowerCase() as any);
}
