import { HTML_ATOMIC_TAGS, HTML_BLOCK_TAGS } from "inferred-types/constants";

/**
 * Tests whether the passed in `val` contains some HTML-like tags in it.
 *
 * **Related:** `hasValidHtml()`, `isHtml()`, `hasValidHtml()`
 */
export function hasHtml(val: unknown): val is string {
  if (typeof val !== "string")
    return false;

  const htmlTagRegex = /.*<(\w+)>.*/;

  return !!htmlTagRegex.test(val);
}

/**
 * Tests that the passed in string _does_ have HTML tags in it and that
 * those tags are valid HTML tags.
 *
 * **Related:** `hasHtml()`, `isHtml()`, `isValidHtml()`
 */
export function hasValidHtml(val: unknown): val is string {
  if (typeof val !== "string")
    return false;

  const trimmedVal = val.trim();

  // Match all HTML tags (opening, closing, and self-closing)

  const tagRegex = /<\/?(\w+)([^>]*)>/g;

  // Stack for tracking opening tags
  const stack: string[] = [];
  let match: RegExpExecArray | null;

  match = tagRegex.exec(trimmedVal);
  while (match !== null) {
    const [, tagName] = match;
    const isClosingTag = match[0].startsWith("</");
    const isAtomicTag = HTML_ATOMIC_TAGS.includes(tagName as any);

    if (isAtomicTag) {
      // Self-closing atomic tags require no stack handling
      match = tagRegex.exec(trimmedVal);
      continue;
    }

    if (isClosingTag) {
      // Validate and pop from stack for closing tags
      const lastTag = stack.pop();
      if (lastTag !== tagName) {
        return false; // Mismatched or unexpected closing tag
      }
    }
    else {
      // Add opening tags to stack if they are valid
      if (!HTML_BLOCK_TAGS.includes(tagName as any)) {
        return false; // Invalid tag name
      }
      stack.push(tagName);
    }

    match = tagRegex.exec(trimmedVal);
  }

  // If the stack is not empty, there are unmatched opening tags
  return stack.length === 0 && tagRegex.test(trimmedVal);
}
