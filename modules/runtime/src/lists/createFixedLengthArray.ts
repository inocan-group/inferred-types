import type { FixedLengthArray, Narrowable } from "inferred-types/types";

/**
 * **createFixedLengthArray**`(content, quantity)`
 *
 * Provides a type strong array of duplicates of what was
 * passed in as `content`
 */
export function createFixedLengthArray<
  T extends Narrowable,
  C extends number,
>(content: T, quantity: C): FixedLengthArray<T, C> {
  return Array.from({ length: quantity }, () => content) as FixedLengthArray<T, C>;
}
