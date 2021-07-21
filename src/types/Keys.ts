/** 
 * A Utility class that provides the same functionality as the built-in
 * `keyof` TS operator but can also:
 * 
 * - receive an array of strings and convert that into a union type.
 * - you can exclude literal string from the returned result
 * 
 * ```ts
 * const t1 = { foo: 1, bar: 2 };
 * // "foo" | "bar"
 * type K = Keys<typeof t1>;
 * const t2 = ["foo", "bar"] as const;
 * // "foo" | "bar"
 * type K = Keys<typeof t2>;
 * ```
 */
export type Keys<
  T extends Record<string, any> | readonly string[],
  W extends string | undefined = undefined
  > = T extends readonly string[]
  ? W extends string ? Exclude<T[number], W> : T[number]
  : W extends string ? Exclude<keyof T & string, W> : keyof T & string;