import { asChars } from "../type-conversion/index";
import { StripWhile } from "src/types/index";

/**
 * **stripWhile**`(content, ...until)`
 *
 * Strips the characters at the start of the string
 * while they match the characters found in `match`
 * parameter.
 */
export const stripWhile = <
  TContent extends string,
  TMatch extends readonly string[]
>(content: TContent, ...match: TMatch) => {
  const stopIdx = asChars(content)
    .findIndex(c => !match.includes(c));

  return content.slice(stopIdx) as unknown as StripWhile<TContent, TMatch[number]>;
}
