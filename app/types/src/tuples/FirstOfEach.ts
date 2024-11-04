/**
 * **FirstOfEach**`<TList>`
 * 
 * Expects `TList` to consist of an array of arrays and then this utility will reduce
 * this to a _tuple_ of all the first elements in `TList`.
 *
 * ```ts
 * // ["foo", "bar"]
 * type A = FirstOfEach<[ ["foo", 1], ["bar", 2] ]>;
 * ```
 */
export type FirstOfEach<
  T extends readonly unknown[][]
> = T[number][0] extends T[number][number]
  ? T[number][0]
  : never;
