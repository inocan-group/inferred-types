import { AfterFirst, AsArray, Join,  Split } from "..";

/**
 * **RetainAfter**`<TStr, TBreak>`
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
export type RetainAfter<
  TStr extends string,
  TBreak extends string
> = string extends TStr
  ? string
  : string extends TBreak
    ? string
    : Join<
        AfterFirst< AsArray<Split<TStr, TBreak>> >,
        TBreak
      >;
