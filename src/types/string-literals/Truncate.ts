import { IfEqual, IfGreaterThan, StrLen, Slice, Split, Concat } from "src/types";

type _Truncate<
  TStr extends string,
  TMaxLen extends number,
  TEllipsis extends boolean
> = TEllipsis extends true
  ? Concat<[...Slice<Split<TStr>,0,TMaxLen>, "..."]>
  : Concat<Slice<Split<TStr>,0,TMaxLen>>;

/**
 * **Truncate**`<TStr,TMaxLen,[TEllipsis]>`
 * 
 * Type utility which ensures that strings beyond the length
 * of `TMaxLen` are truncated at this length.
 * 
 * - if the optional `TEllipsis` is set to **true** three
 * period characters will be added after the truncation 
 * in cases where text was actually truncated.
 */
export type Truncate<
  TStr extends string,
  TMaxLen extends number,
  TEllipsis extends boolean = false
> = IfEqual<
  TMaxLen, number, 
  // non-literal value for max
  never,
  IfGreaterThan<
    StrLen<TStr>, TMaxLen,
    // truncation required
    _Truncate<TStr, TMaxLen, TEllipsis>,
    // no truncation required
    TStr
  >
>;

