import {  StripChars, TupleToUnion } from "@inferred-types/types";
import { asChars } from "src/runtime/index";

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
): StripChars<TContent, TupleToUnion<TRetain>> => {
  let chars: readonly string[] = asChars(content);

  return (
    chars.filter(c => !strip.includes(c)).join("")
   ) as unknown as StripChars<TContent, TupleToUnion<TRetain>>
}


