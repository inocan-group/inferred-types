import type { AsString, And,  IsStringLiteral,  AsNumber } from "src/types/index";


type Process<
  TContent extends string, 
  TStrip extends string
> = And<[ IsStringLiteral<TContent>, IsStringLiteral<TStrip>]> extends true
  ? TContent extends `${infer Before}${TStrip}` 
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
> = TContent extends number
? AsNumber<
    Process<
      AsString<TContent>, 
      AsString<TStrip>
    >
  >
: TContent extends string
  ? Process<
      AsString<TContent>, 
      AsString<TStrip>
    >
  : never;
