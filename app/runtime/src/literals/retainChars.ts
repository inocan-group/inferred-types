import { RetainChars, TupleToUnion } from "@inferred-types/types";
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
  let chars: readonly string[] = asChars(content);


  return chars.filter(c => retain.includes(c)).join("") as unknown as RetainChars<TContent, TupleToUnion<TRetain>>
}


