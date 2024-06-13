import { StripUntil } from "src/types/string-literals";
import { asChars } from "../type-conversion/index";
import { TupleToUnion } from "src/types/type-conversion";

/**
 * **stripUntil**`(content, ...until)`
 *
 * Strips the characters at the start of the string
 * until a character specified in `until` is found.
 */
export const stripUntil = <
  TContent extends string,
  TUntil extends readonly string[]
>(content: TContent, ...until: TUntil) => {
  const stopIdx = asChars(content)
    .findIndex(c => until.includes(c));

  return content.slice(stopIdx) as unknown as StripUntil<TContent, TupleToUnion<TUntil>>;
}
