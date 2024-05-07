import { AsString, IfAnd, IsLiteral, IsString } from "src/types/index";


/**
 * **StripEnding**`<TContent, TStrip>`
 *
 * Will strip off `TStrip` from the ending of `TContent` when
 * it is found.
 * 
 * ```ts
 * type T = "Hello World";
 * type U = " World";
 * // "Hello"
 * type R = StripEnding<T,U>;
 * ```
 */
export type StripTrailing<
  TContent, 
  TStrip
> = TContent extends number
? StripTrailing<AsString<TContent>, TStrip>
: TStrip extends number
  ? StripTrailing<TContent, AsString<TStrip>>
  : IfAnd<
  [ IsString<TContent>, IsString<TStrip> ],
  IfAnd<
    [ IsLiteral<TContent>, IsLiteral<TStrip>],
    TContent extends `${infer Before}${AsString<TStrip>}` 
      ? Before 
      : TContent,
    string
  >,
  never
>;
