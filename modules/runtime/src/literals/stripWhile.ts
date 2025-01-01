import type { StripWhile } from "inferred-types/types";
import { asChars } from "inferred-types/runtime";

/**
 * **stripWhile**`(content, ...until)`
 *
 * Strips the characters at the start of the string
 * while they match the characters found in `match`
 * parameter.
 */
export function stripWhile<
  TContent extends string,
  TMatch extends readonly string[],
>(content: TContent, ...match: TMatch) {
  const stopIdx = asChars(content)
    .findIndex(c => !match.includes(c));

  return content.slice(stopIdx) as unknown as StripWhile<TContent, TMatch[number]>;
}
