import {  RetainWhile } from "src/types/string-literals";
import { asChars } from "../type-conversion"
import { TupleToUnion } from "src/types/type-conversion";


/**
 * **retainWhile**`(content, ...retain)`
 *
 * Retains the characters at the start of the string
 * so long as they are part of the character values
 * passed in for `retain[]`
 */
export const retainWhile = <
  TContent extends string,
  TRetain extends readonly string[]
>(
  content: TContent,
  ...retain: TRetain
) => {
  const stopIdx = asChars(content).findIndex(c => !retain.includes(c));
  return content.slice(0,stopIdx) as unknown as RetainWhile<TContent, TupleToUnion<TRetain>>;
}
