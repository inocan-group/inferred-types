import {  AfterFirst, First, IsStringLiteral, IsUnion, UnionToTuple } from "src/types/index";
import { Replace } from "./Replace";


type Process<
  TText extends string, 
  TFind extends string, 
  TReplace extends string
> = Replace<TText,TFind,TReplace> extends `${string}${TFind}${string}`
? Process<
    Replace<TText,TFind,TReplace>,
    TFind,
    TReplace
  >
: Replace<TText,TFind,TReplace>

type Iterate<
  TText extends string, 
  TFind extends readonly string[], 
  TReplace extends string
> = [] extends TFind
? TText
: Iterate<
      Process<TText,First<TFind>, TReplace>,
      AfterFirst<TFind>,
      TReplace
  >

/**
 * **ReplaceAll**`<TText,TFind,TReplace>`
 * 
 * Type utility which takes a string `TText` and finds _all_ instances of
 * `TFind` and replaces it with `TReplace`.
 * 
 * ```ts
 * const fooy = "fooy";
 * // "Foo"
 * type Foo = Replace<typeof fooy, "y", "">;
 * ```
 *
 * **Related:** `Replace`
 */
export type ReplaceAll<
  TText extends string, 
  TFind extends string, 
  TReplace extends string
> = IsStringLiteral<TText> extends true
  ? IsStringLiteral<TFind> extends true
    ? IsUnion<TFind> extends true
      ? UnionToTuple<TFind> extends readonly string[]
        ? Iterate<TText,UnionToTuple<TFind>,TReplace>
        : never
      : Process<TText,TFind,TReplace>
    : string
 : string;
