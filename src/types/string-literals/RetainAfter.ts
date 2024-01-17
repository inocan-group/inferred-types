import { IfAllLiteral } from "src/types/index";

/**
 * **RetainAfter**`<TStr, TBreak>`
 * 
 * Receives a string `TStr` and truncates all characters in 
 * the first occurrence of `TBreak` and all remaining chars.
 * 
 * ### Example
 * ```ts
 * // "world"
 * type T = RetainAfter<"hello world", " ">;
 * ```
 */
export type RetainAfter<
  TStr extends string,
  TBreak extends string
> = IfAllLiteral<
  [TStr, TBreak],
  TStr extends `${string}${TBreak}${infer REST}`
    ? `${REST}`
    : TStr,
  string
>
