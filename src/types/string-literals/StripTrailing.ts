import type { AsString, IfAnd,  IsStringLiteral } from "src/types/index";


type Process<
TContent extends string, 
TStrip extends string
> = IfAnd<
  [ IsStringLiteral<TContent>, IsStringLiteral<TStrip>],
  TContent extends `${infer Before}${AsString<TStrip>}` 
    ? Before 
    : TContent,
  string
>

/**
 * **StripEnding**`<TContent, TStrip>`
 *
 * Will strip off `TStrip` from the ending of `TContent` when
 * it is found.
 * 
 * ```ts
 * type T = "Hello World";
 * type U = " World";
 * // "Hello"re
 * type R = StripEnding<T,U>;
 * ```
 */
export type StripTrailing<
  TContent, 
  TStrip
> = Process<AsString<TContent>, AsString<TStrip>>;
