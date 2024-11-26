import {  Last } from "inferred-types/types";

/**
 * **LastOfEach**`<TList>`
 *
 * Expects `TList` to consist of an array of arrays and then this utility will reduce
 * this to a _tuple_ of all the _last_ elements in `TList`
 *
 * ```ts
 * // [1, 2]
 * type A = LastOfEach<[ ["foo", 1], ["bar", 2] ]>;
 * ```
 */
export type LastOfEach<
  T extends readonly unknown[][]
> = {
  [K in keyof T]: T[K] extends readonly unknown[]
    ? Last<T[K]>
    : never
}

