import { NUMERIC_CHAR, WHITESPACE_CHARS } from "inferred-types/constants";
import { retainChars, stripChars } from "inferred-types/runtime";

/**
 * **isPhoneNumber**`(val)`
 *
 * Type guard which validates that a string is in the shape of a phone
 * number.
 *
 * - Only valid characters (numeric, whitespace, `+`, `-`, `.`, and parenthesis)
 * - at least 7 numeric characters, 8 if `+` character used
 * - leading character (after whitespace) must be numeric, `(` or `+`
 *
 * **Related:** `asPhoneNumber()`, `PhoneNumber`
 */
export function isPhoneNumber(val: unknown) {
  const svelte: string = String(val).trim();
  const chars: readonly string[] = svelte.split("");
  const numeric: string = retainChars(svelte, ...NUMERIC_CHAR);
  const valid = ["+", "(", ...NUMERIC_CHAR];
  const nothing: string = stripChars(svelte, ...[
    ...NUMERIC_CHAR,
    ...WHITESPACE_CHARS,
    "(",
    ")",
    "+",
    ".",
    "-",
  ]);

  return (
    chars.every(i => valid.includes(i))
    && svelte.startsWith(`+`)
      ? numeric.length >= 8
      : svelte.startsWith(`00`)
        ? numeric.length >= 10
        : numeric.length >= 7
          && nothing === ""
  );
}
