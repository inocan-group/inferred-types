
// NOTE: this is a copy of the tried and test implementation in `native-dash`
// but wanted to have it here too to avoid having a circular dep (typically 
// it would be more common for native-dash to be a consumer of this repo
// than the other way around)

/**
 * **Omit**`<T, K>`
 * 
 * Type utility which will remove keys of an object while preserving the
 * types of all other key/values.
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * **omit**
 *
 * Removes/omits properties of an object and returns a shallow copy with props
 * removed and with typescript types updated to reflect this removal.
 *
 * @param obj the starting state object
 * @param removals an array of properties to be removed from the object
 */
export function omit<T extends {}, K extends Array<keyof T>>(obj: T, ...removals: K) {
  const untyped = removals as Array<unknown>;
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !untyped.includes(key))
  ) as Omit<T, K[number]>;
}
