import { HTML_ATOMIC_TAGS, HTML_BLOCK_TAGS } from "inferred-types/constants";

/**
 * **isHtml**`(val)`
 *
 * Tests whether the passed in `val` is an HTML string which:
 *
 * - starts and ends with an HTML-like tag
 * - leading and trailing whitespace is ignored
 */
export function isHtml(val: unknown): val is string {
  if (typeof val !== "string")
    return false;

  const trimmedVal = val.trim();
  // eslint-disable-next-line regexp/optimal-quantifier-concatenation
  const fullHtmlRegex = /^<(\w+).*<\/\1>$/;

  return fullHtmlRegex.test(trimmedVal);
}

/**
 * **isValidHtml**`(val)`
 *
 * Tests whether the passed in `val` is an HTML string which:
 *
 * - starts and ends with a valid HTML tag
 * - all block tags are _balanced_ between open and close variants
 * - leading and trailing whitespace is ignored in the match
 */
export function isValidHtml(val: unknown): val is string {
  if (typeof val !== "string")
    return false;

  const trimmedVal = val.trim();

  // Match all HTML tags (opening, closing, and self-closing)
  const tagRegex = /<\/?(\w+)([^>]*)>/g;

  // Stack for tracking opening tags
  const stack: string[] = [];

  let match: RegExpExecArray | null = tagRegex.exec(trimmedVal);
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

    // Reassign match at the end of each iteration
    match = tagRegex.exec(trimmedVal);
  }

  // If the stack is not empty, there are unmatched opening tags
  const isBalanced = stack.length === 0;

  // eslint-disable-next-line regexp/optimal-quantifier-concatenation
  const validStructureRegex = /^<(\w+)[^>]*>[\s\S]*<\/\1>$/;

  return isBalanced && validStructureRegex.test(trimmedVal);
}
