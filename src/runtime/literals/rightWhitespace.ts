import { WHITESPACE_CHARS } from "inferred-types/dist/constants/index"
import {  retainAfterInclusive } from "./retainAfter"
import { TrimLeft } from"inferred-types/dist/types/index"
import { RetainAfter, Whitespace } from "inferred-types/dist/types/index"

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
