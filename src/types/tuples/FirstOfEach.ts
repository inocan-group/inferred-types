/**
 * For a two-dimensional array, returns a _union type_ which combines the first element of the interior
 * array.
 *
 * ```ts
 * const test = [ ["foo", 1], ["bar", 2] ];
 * // "foo" | "bar"
 * type F = FirstOfEach<typeof test>;
 * ```
 */
export type FirstOfEach<T extends readonly any[][]> = T[number][0] extends T[number][number]
  ? T[number][0]
  : never;
