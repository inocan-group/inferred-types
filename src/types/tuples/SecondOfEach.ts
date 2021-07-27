
/**
 * For a two-dimensional array, returns a _union type_ which combines the first element of the interior
 * array.
 * 
 * ```ts
 * // 1 | 2
 * type F = SecondOfEach<[ ["foo", 1], ["bar", 2] ]>;
 * ```
 */
export type SecondOfEach<T extends any[][]> = T[number][1] extends T[number][number]
  ? T[number][1]
  : never;
