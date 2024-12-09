import {  EnsureLeading } from "inferred-types/types";
import { isString } from "src/type-guards/isString";

/**
 * **ensureLeading**(content, strip)
 *
 * Runtime utility which ensures that last part of a string -- `content` -- has the
 * substring `ensure` at the end and adds it if not present.
 */
export function ensureLeading<
  T extends string | number,
  U extends string | number
>(
  content: T,
  ensure: U
) {
  let output: string = String(content);

  return (
    output.startsWith(String(ensure))
      ? content
      : isString(content)
        ? `${ensure}${content}`
        : Number(`${ensure}${content}`)
  )  as EnsureLeading<T,U>

}
