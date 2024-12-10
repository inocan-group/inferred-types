import type { StripChars } from "inferred-types/types";
import { asChars } from "inferred-types/runtime";

/**
 * **stripChars**`(content, ...strip)`
 *
 * Strips out characters found in `content`.
 *
 * **Related:** `retainChars()`
 */
export function stripChars<
  TContent extends string,
  TRetain extends readonly string[],
>(content: TContent, ...strip: TRetain): StripChars<TContent, TRetain[number]> {
  const chars: readonly string[] = asChars(content);

  return (
    chars.filter(c => !strip.includes(c)).join("")
  ) as unknown as StripChars<TContent, TRetain[number]>;
}
