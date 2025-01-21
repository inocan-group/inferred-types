/**
 * type guard which validates that `val` is a string which could represent
 * the attributes in an HTML tag.
 */
export function validHtmlAttributes(val: unknown): val is string {
  if (typeof val !== "string")
    return false;

  // Basic checks for attributes: no unbalanced quotes, no `>` within attributes
  const quoteRegex = /["']/g;
  const unmatchedQuotes = (val.match(quoteRegex)?.length || 0) % 2 !== 0;

  // Check for invalid attribute assignment (e.g., id=)
  const invalidAssignment = /(\w+=)(?=\s|>|$)/.test(val);

  return !val.includes(">") && !unmatchedQuotes && !invalidAssignment;
}
