import { WHITESPACE_CHARS } from "src/constants/Characters"
import {  retainAfterInclusive } from "./retainAfter"
import { TrimLeft } from "src/types/type-conversion"
import { RetainAfter, Whitespace } from "src/types/string-literals"

/**
 * **rightWhitespace**`(content)`
 *
 * Extracts and returns the whitespace on the _right_ part of the string.
 */
export const rightWhitespace = <T extends string>(content: T) => {
  const trimmed = content.trimStart() as string;
  return retainAfterInclusive(
    trimmed,
    ...WHITESPACE_CHARS
  ) as unknown as RetainAfter<TrimLeft<T>, Whitespace, true>
}
