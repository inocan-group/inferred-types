/* eslint-disable @typescript-eslint/no-unused-vars */

import { AfterFirst, First } from "../../lists";

/**
 * Get the type of a property of an object:
 * ```ts
 * const car = { make: "Chevy", model: "Malibu", }
 * ```
 */
export type Get<T, K> = K extends `${infer FK}.${infer L}`
  ? FK extends keyof T
    ? Get<T[FK], L>
    : never
  : K extends keyof T
  ? T[K]
  : never;


  type GetEachAcc<T extends any[] | readonly any[], K, Processed extends readonly any[] = []> = //
  [] extends T
    ? Processed
    : GetEachAcc<AfterFirst<T>, K, [...Processed, Get<First<T>, K>]>;


/**
 * **GetEach**`<T, K>`
 * 
 * Type utility which receives an array of types -- `T` -- and then _gets_ a 
 * key or nested key `K` (using dot syntax) from each element in the array
 * ```ts
 * // ["Bob", "Wendy"]
 * type T = GetEach<[
 *    { name: "Bob", age: 12 },
 *    { name: "Wendy", age: 24 }
 * ], "name">
 * ```
 */
export type GetEach<T extends any[] | readonly any[], K> = GetEachAcc<T, K>;
