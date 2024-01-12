import {  Slice, Split, Join, IfAllLiteral, Tuple } from "src/types";

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
  Split<TStr, TBreak> extends Tuple
  ? Join<
    Slice< Split<TStr, TBreak>, 1 >,
    TBreak
  >
  : TStr,
  // TStr or TBreak is wide
  string
>;
