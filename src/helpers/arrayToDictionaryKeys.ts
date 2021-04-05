/**
 * converts an array of strings to a dictionary with those strings as
 * key's and the values all set to `true`.
 *
 * This transform is useful when dealing with `io-ts` because it allows
 * us to use the output data structure as a set of string literals in a
 * more compact form than the `io-ts` API:
 *
 * ```ts
 * const du = arrayToDictionaryKeys("foo", "bar", "baz");
 * const MyType = t.type({ myProp: t.keysOf(du) });
 * ```
 */
export function arrayToDictionaryKeys(items: string[]) {
  return items.reduce((acc, key) => ({ ...acc, [key]: true }), {});
}
