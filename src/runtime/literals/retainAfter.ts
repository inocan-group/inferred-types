import { RetainAfter } from "src/types";

/**
 * **RetainAfter**(content, find)
 * 
 * Runtime utility which removes all characters in a given string _until_
 * it finds the first instance of a substring defined in **find** variable.
 * 
 * ### Example
 * ```ts
 * // "world"
 * const world = retainAfter("hello world", " ");
 * ```
 */
export function retainAfter<
  TContent extends string,
  TBreak extends string
>(content: TContent, find: TBreak) {
  const parts = content.split(find);
  parts.shift();
  return parts.join(find) as RetainAfter<TContent,TBreak>;
}
