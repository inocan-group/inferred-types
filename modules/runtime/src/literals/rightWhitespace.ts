import type { RetainAfter, TrimLeft, Whitespace } from "inferred-types/types";
import { WHITESPACE_CHARS } from "inferred-types/constants";
import { retainAfterInclusive } from "./retainAfter";

/**
 * **rightWhitespace**`(content)`
 *
 * Extracts and returns the whitespace on the _right_ part of the string.
 */
export function rightWhitespace<T extends string>(content: T) {
  const trimmed = content.trimStart() as string;
  return retainAfterInclusive(
    trimmed,
    ...WHITESPACE_CHARS,
  ) as unknown as RetainAfter<TrimLeft<T>, Whitespace, true>;
}
