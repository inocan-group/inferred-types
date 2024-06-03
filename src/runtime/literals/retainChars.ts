import { RetainChars, TupleToUnion } from "src/types/type-conversion";
import { asChars } from "../type-conversion/asChars";

/**
 * **retainChars**`(content, ...retain)`
 *
 * Retains the characters from `retain[]` which are
 * found in `content` while discarding the rest.
 *
 * ```ts
 * // "42"
 * const num = retainChars("4foobar2", ...NUMERIC_CHAR);
 * ```
 *
 * **Related:** `stripChars()`, `retainWhile()`, `retainUntil()`
 */
export const retainChars = <
  TContent extends string,
  TRetain extends readonly string[]
>(
  content: TContent,
  ...retain: TRetain
): RetainChars<TContent, TupleToUnion<TRetain>> => {
  return asChars(content).filter(c => retain.includes(c)).join("") as unknown as RetainChars<TContent, TupleToUnion<TRetain>>
}


