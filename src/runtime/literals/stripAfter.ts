import { StripAfter } from "../../types/base";

/**
 * **stripAfter**(content, find)
 * 
 * Runtime utility which strips out all characters after (and including)
 * the "find" string while returning a strong type.
 * 
 * ### Example
 * ```ts
 * // "hello"
 * const hello = stripAfter("hello world", " ");
 * ```
 */
export function stripAfter<
  TContent extends string,
  TBreak extends string
>(content: TContent, find: TBreak) {
  return content.split(find).shift() as StripAfter<TContent, TBreak>;
}
