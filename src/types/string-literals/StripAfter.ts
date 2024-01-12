import {  AsTuple, First, Split } from "src/types";

/**
 * **StripAfter**`<TStr, TBreak>`
 * 
 * Receives a string `TStr` and truncates all characters in 
 * the first occurrence of `TBreak` and all remaining chars.
 * 
 * ### Example
 * ```ts
 * // "hello"
 * type T = StripAfter<"hello world", " ">;
 * ```
 */
export type StripAfter<
  TStr extends string,
  TBreak extends string
> = First< AsTuple<Split<TStr, TBreak>> >;
