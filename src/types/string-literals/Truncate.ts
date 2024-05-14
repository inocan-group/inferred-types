import { 
  IsEqual, 
  IsGreaterThan, 
  If,
  StrLen, 
  Slice, 
  Concat, 
  Tuple,  
  Length, 
  AsArray, 
  Chars 
} from "src/types/index";

type Ellipsis<T extends boolean | string> = T extends string ? T : "...";

type _Truncate<
  TStr extends string,
  TMaxLen extends number,
  TEllipsis extends boolean | string
> = TEllipsis extends false
  ? Chars<TStr> extends readonly string[]
    ? Concat<AsArray<Slice<Chars<TStr>,0,TMaxLen>>>
    : never
  : Chars<TStr> extends readonly string[]
    ? Concat<[...AsArray<Slice<Chars<TStr>,0,TMaxLen>>, Ellipsis<TEllipsis>]>
    : never;

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
? If<
    IsEqual<TMaxLen, number>, 
    // non-literal value for max
    never,
    If<
      IsGreaterThan<StrLen<TContent>, TMaxLen>,
      // truncation required
      _Truncate<TContent, TMaxLen, TEllipsis>,
      // no truncation required
      TContent
    >
  >
: TContent extends unknown[]
  ? If<
      IsGreaterThan<Length<TContent & readonly unknown[]>,TMaxLen>,
      TEllipsis extends false
        ? Slice<TContent,0,TMaxLen>
        : [...Slice<TContent,0,TMaxLen>, Ellipsis<TEllipsis>],
      TContent
    >
  : never;


