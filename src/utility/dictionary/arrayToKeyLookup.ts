/**
 * Passing in an array of strings, you are passed back a dictionary with
 * all the keys being the strings and values set to `true`.
 * ```ts
 * // { bar: true, bar: true } as const;
 * const d - dictArr(arr);
 *
 * const fooBar = arrayToKeyLookup("foo", "bar");
 * ```
 */
export function arrayToKeyLookup<T extends readonly string[]>(...keys: T): Record<T[number], true> {
  const obj: Record<string, true> = {};

  for (const key of keys) {
    obj[key] = true;
  }

  return obj;
}
