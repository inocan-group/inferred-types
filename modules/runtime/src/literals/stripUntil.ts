import { asChars } from "src/type-conversion/index";
import { TupleToUnion,StripUntil } from "inferred-types/types";

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
