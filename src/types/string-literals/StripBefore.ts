import {  Slice, Split, Join, IfAllLiteral } from "src/types";

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
  Join<
    Slice< Split<TStr, TBreak>, 1 >,
    TBreak
  >,
  // TStr or TBreak is wide
  string
>;
