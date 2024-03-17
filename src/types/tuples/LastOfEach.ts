import {  Last } from "src/types/index";

/**
 * **LastOfEach**`<TList>`
 * 
 * Expects `TList` to consist of an array of arrays and then this utility will reduce
 * this to a _union_ of all the _last_ elements in `TList`
 *
 * ```ts
 * // "foo" | "bar"
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

