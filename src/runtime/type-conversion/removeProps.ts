
// NOTE: this is a copy of the tried and test implementation in `native-dash`
// but wanted to have it here too to avoid having a circular dep (typically 
// it would be more common for native-dash to be a consumer of this repo
// than the other way around)

import { Mutable, SimplifyObject } from "src/types";

/**
 * **removeProps**`<T,K>`
 *
 * Removes/omits properties of an object and returns a shallow copy with props
 * removed and with typescript types updated to reflect this removal.
 * 
 * ```ts
 * // { foo: number }
 * const t = removeProps({foo: 42, bar: 16})
 * // { foo: 42 }
 * const t2 = removeProps({foo: 42, bar: 16} as const)
 * ```
 */
export function removeProps<T extends {}, K extends Array<keyof T>>(
  obj: T, 
  ...removals: K
) {
  const untyped = removals as Array<unknown>;
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !untyped.includes(key))
  ) as Mutable<SimplifyObject<Omit<T, K[number]>>>;
}
