import type {
  AsHtmlTag,
  Html__AtomicTag,
  Html__BlockTag,
} from "inferred-types/types";
import {
  HTML_ATOMIC_TAGS,
  HTML_BLOCK_TAGS,
} from "inferred-types/constants";
import { isString, validHtmlAttributes } from "inferred-types/runtime";

/**
 * tests whether the `val` passed in is the **name** of a valid
 * HTML block tag (e.g., "div", "span", etc.)
 *
 * **Note:** this will _not_ match with leading or trailing whitespace
 */
export function isValidBlockTag(val: unknown): val is string {
  return isString(val) && HTML_BLOCK_TAGS.includes(val.toLowerCase() as any);
}

/**
 * test whetehr the `val` pass in is a the **name** of a valid HTML
 * atomic tag (e.g., "br", "meta", etc.)
 *
 * **Note:** this will _not_ match with leading or trailing whitespace
 */
export function isValidAtomicTag(val: unknown): val is string {
  return isString(val) && HTML_ATOMIC_TAGS.includes(val.toLowerCase() as any);
}

/**
 * **isValidHtmlTag**`(...tags)(val)`
 *
 * A higher order type guard which tests that the `val` passed in
 * is a valid HTML tag (block or atomic) or the types specified.
 *
 * - if it's an openning or atomic tag then the tag name is validated
 * but so are the characters between the tag name and the close.
 * - if it's a closing tag then NO characters are allowed beyond
 * that of the tag and the brackets.
 */
export function isValidHtmlTag<
  T extends readonly (Html__BlockTag | Html__AtomicTag)[],
>(...tags: T) {
  return <V>(val: V): val is V & AsHtmlTag<V, T[number]> => {
    if (typeof val !== "string")
      return false;

    const trimmedVal = val.trim();

    // Match opening, closing, and atomic tags
    const tagRegex = /^<\/?(\w+)(.*?)>$/;
    const match = tagRegex.exec(trimmedVal);

    if (!match) {
      return false; // Not a valid HTML tag structure
    }

    const [, tagName, attributes] = match;
    const normalizedTagName = tagName.toLowerCase(); // Normalize to lowercase
    const isClosingTag = trimmedVal.startsWith("</");
    const isAtomicTag = HTML_ATOMIC_TAGS.includes(normalizedTagName as any);
    const isBlockTag = HTML_BLOCK_TAGS.includes(normalizedTagName as any);

    if (
      // Validate tag name is within the provided `tags` scope
      !tags.map(t => t.toLowerCase()).includes(normalizedTagName as any)
    ) {
      return false;
    }

    if (isClosingTag) {
      return attributes.trim() === "" && !isAtomicTag;
    }

    if (isAtomicTag) {
      return attributes.trim() === "" || validHtmlAttributes(attributes);
    }

    if (isBlockTag) {
      return validHtmlAttributes(attributes);
    }

    return false;
  };
}
