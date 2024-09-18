import { RetainUntil } from "src/types/string-literals";
import { asChars } from "../type-conversion";

/**
 * **retainUntil**`(content, ...find)`
 *
 * Runtime utility which removes all characters in a given string _until_
 * it finds the first instance of a substring defined in **find** variable.
 *
 * ### Example
 * ```ts
 * // "world"
 * const world = retainUntil("hello world", " ");
 * ```
 *
 * **Related:** `retainUntilInclusive()`
 */
export function retainUntil<
  TContent extends string,
  TFind extends readonly string[]
>(content: TContent, ...find: TFind) {
  const chars = asChars(content) as readonly string[];

  let idx = 0;
  while (!find.includes(chars[idx]) && idx <= chars.length) {
    idx = idx+1;
  }

  return (
    idx === 0
    ? ""
    : content.slice(0,idx)
  ) as unknown as RetainUntil<TContent, TFind[number]>;
}
