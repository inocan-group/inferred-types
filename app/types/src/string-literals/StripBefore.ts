import { IsStringLiteral } from "src/types/index";

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
> = IsStringLiteral<TStr> extends true
  ? IsStringLiteral<TBreak> extends true
    ? TStr extends `${string}${TBreak}${infer REST}`
      ? `${REST}`
      : TStr
    : string
  : string
