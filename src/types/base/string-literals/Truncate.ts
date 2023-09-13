import { IfEqual, IfGreaterThan, StrLen, Slice, Split, Concat, Tuple, IsTuple, Length } from "..";

type Ellipsis<T extends boolean | string> = T extends string ? T : "...";

type _Truncate<
  TStr extends string,
  TMaxLen extends number,
  TEllipsis extends boolean | string
> = TEllipsis extends false
  ? Concat<Slice<Split<TStr>,0,TMaxLen>>
  : Concat<[...Slice<Split<TStr>,0,TMaxLen>, Ellipsis<TEllipsis>]>;

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
  TContent extends string | Tuple,
  TMaxLen extends number,
  TEllipsis extends boolean | string = false
> = TContent extends string
? IfEqual<
    TMaxLen, number, 
    // non-literal value for max
    never,
    IfGreaterThan<
      StrLen<TContent>, TMaxLen,
      // truncation required
      _Truncate<TContent, TMaxLen, TEllipsis>,
      // no truncation required
      TContent
    >
  >
: TContent extends unknown[]
  ? IfGreaterThan<
      Length<TContent & readonly unknown[]>,TMaxLen,
      TEllipsis extends false
        ? Slice<TContent,0,TMaxLen>
        : [...Slice<TContent,0,TMaxLen>, Ellipsis<TEllipsis>],
      TContent
    >
  : never;


