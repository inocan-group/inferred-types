import {  IfStringLiteral, Split } from "src/types/index";

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
> = IfStringLiteral<
  TStr,
  IfStringLiteral<
    TBreak,
    TStr extends `${infer Before}${TBreak}${string}`
      ? Before
      : TStr,
    string
  >,
  string
>;
