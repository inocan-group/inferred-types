import {  AfterFirst, First, IsLiteral, IsStringLiteral, IsUnion, UnionToTuple } from "@inferred-types/types";
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
  >;

type Singular<
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

 type Multiple<
  TText extends readonly string[],
  TFind extends string,
  TReplace extends string,
  TResult extends readonly string[] = []
> = [] extends TText
? TResult
: Multiple<
    AfterFirst<TText>,
    TFind,
    TReplace,
    [
      ...TResult,
      ReplaceAll<First<TText>,TFind,TReplace>
    ]
  >;

/**
 * **ReplaceAll**`<TText,TFind,TReplace>`
 *
 * Type utility which takes a string `TText` and finds _all_ instances of
 * `TFind` and replaces it with `TReplace`.
 *
 * ```ts
 * const fooy = "fooy, Joey";
 * // "foo, Joe"
 * type Foo = ReplaceAll<typeof fooy, "y", "">;
 * ```
 *
 * **Related:** `Replace`
 *
 * - **Note:** this utility has been upgraded to take either a _string_ or a
 * _tuple_ of strings for `TText`.
 */
export type ReplaceAll<
  TText extends string | readonly string[],
  TFind extends string,
  TReplace extends string
> = TText extends readonly string[]
? IsLiteral<TText> extends true
  ? Multiple<TText,TFind,TReplace>
  : string[]
: TText extends string
? Singular<TText,TFind,TReplace>
: never;
