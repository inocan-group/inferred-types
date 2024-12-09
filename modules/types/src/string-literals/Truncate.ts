import {
  IsEqual,
  IsGreaterThan,
  If,
  StrLen,
  Concat,
  Chars,
  TakeFirst
} from "inferred-types/types";

type Ellipsis<T extends boolean | string> = T extends string
  ? T
  : T extends true ? "..." : "";

type _Truncate<
  TStr extends readonly string[],
  TMaxLen extends number,
  TEllipsis extends string
> = TakeFirst<TStr, TMaxLen> extends readonly string[]
? Concat<[...TakeFirst<TStr, TMaxLen>, TEllipsis]>
: never

/**
 * **Truncate**`<TStr,TMaxLen,[TEllipsis]>`
 *
 * Type utility which ensures that strings and/or tuples beyond the length
 * of `TMaxLen` are truncated at this length.
 *
 * - if the optional `TEllipsis` is set to **true** three
 * period characters will be added after the truncation
 * in cases where text was actually truncated.
 * - if you want to create your own terminal ellipsis representation you can
 * add a string literal value to the `TEllipsis` property
 */
export type Truncate<
  TContent extends string,
  TMaxLen extends number,
  TEllipsis extends boolean | string = false
> = TContent extends string
? If<
    IsEqual<TMaxLen, number>,
    // non-literal value for max
    never,
    If<
      IsGreaterThan<StrLen<TContent>, TMaxLen>,
      // truncation required
      _Truncate<
        Chars<TContent>,
        TMaxLen,
        Ellipsis<TEllipsis>
      >,
      // no truncation required
      TContent
    >
  >

  : never;


