import type { StripUntil, TupleToUnion } from "inferred-types/types";
import { asChars } from "inferred-types/runtime";

/**
 * **stripUntil**`(content, ...until)`
 *
 * Strips the characters at the start of the string
 * until a character specified in `until` is found.
 */
export function stripUntil<
  TContent extends string,
  TUntil extends readonly string[],
>(content: TContent, ...until: TUntil) {
  const stopIdx = asChars(content)
    .findIndex(c => until.includes(c));

  return content.slice(stopIdx) as unknown as StripUntil<TContent, TupleToUnion<TUntil>>;
}
