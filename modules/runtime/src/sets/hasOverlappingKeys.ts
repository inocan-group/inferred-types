import type { AnyObject } from "inferred-types/types";

/**
 * checks whether objects `A`, and `B` have overlapping
 * keys.
 */
export function hasOverlappingKeys<
  A extends AnyObject,
  B extends AnyObject,
>(
  a: A,
  b: B,
): boolean {
  const keys = Object.keys(a);

  for (const k of keys) {
    if (k in b) {
      return true;
    }
  }

  return false;
}
