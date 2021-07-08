/** 
 * A Utility class that provides the same functionality as the built-in
 * `keyof` TS operator but can also receive an array of strings and
 * convert that into a union type.
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
  T extends Record<string, any> | readonly string[]
  > = T extends readonly string[]
  ? T[number]
  : keyof T & string;