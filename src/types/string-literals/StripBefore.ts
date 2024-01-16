import { IfAllLiteral } from "src/types";

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
> = IfAllLiteral<
  [ TStr, TBreak ],
  // TStr and TBreak are both string literals
  TStr extends `${string}${TBreak}${infer REST}`
  ? `${REST}`
  : TStr,
  // TStr or TBreak is wide
  string
>;
