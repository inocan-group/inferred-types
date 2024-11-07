import {  StripChars, TupleToUnion } from "inferred-types/dist/types/index";
import { asChars } from "inferred-types/dist/runtime/index";

/**
 * **stripChars**`(content, ...strip)`
 *
 * Strips out characters found in `content`.
 *
 * **Related:** `retainChars()`
 */
export const stripChars = <
  TContent extends string,
  TRetain extends readonly string[]
>(
  content: TContent,
  ...strip: TRetain
): StripChars<TContent, TRetain[number]> => {
  let chars: readonly string[] = asChars(content);

  return (
    chars.filter(c => !strip.includes(c)).join("")
   ) as unknown as StripChars<TContent, TRetain[number]>
}


