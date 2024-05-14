import type { AsString, And,  IsStringLiteral, IsNumber, AsNumber } from "src/types/index";


type Process<
  TContent extends string, 
  TStrip extends string
> = And<[ IsStringLiteral<TContent>, IsStringLiteral<TStrip>]> extends true
  ? TContent extends `${infer Before}${AsString<TStrip>}` 
    ? Before 
    : TContent
  : string;

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
  TContent extends string|number, 
  TStrip extends string|number
> = IsNumber<TContent> extends true
? AsNumber<Process<
  AsString<TContent>, 
  AsString<TStrip>
>>
: Process<
AsString<TContent>, 
AsString<TStrip>
>
