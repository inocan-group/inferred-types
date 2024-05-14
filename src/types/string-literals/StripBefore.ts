import {  If,IsStringLiteral } from "src/types/index";

/**
 * **StripBefore**`<TStr, TBreak>`
 * 
 * Receives a string `TStr` and truncates all characters in 
 * the first occurrence of `TBreak` and all remaining chars.
 * 
 * ### Example
 * ```ts
 * // "world"
 * type T = StripBefore<"hello world", " ">;
 * ```
 */
export type StripBefore<
  TStr extends string,
  TBreak extends string
> = If<
  IsStringLiteral<TStr>,
  If<
    IsStringLiteral<TBreak>, 
    TStr extends `${string}${TBreak}${infer REST}`
      ? `${REST}`
      : TStr,
    string
  >,
  string
>
