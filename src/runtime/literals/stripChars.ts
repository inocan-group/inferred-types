import {  StripChars, TupleToUnion } from "src/types/type-conversion";
import { asChars } from "../type-conversion/asChars";

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
  return asChars(content).filter(c => !strip.includes(c)).join("") as unknown as StripChars<TContent, TupleToUnion<TRetain>>
}


