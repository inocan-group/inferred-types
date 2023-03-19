import { IfEqual, IfGreaterThan, StrLen } from "src/types";

type _Truncate<
  TStr extends string,
  TMaxLen extends number,
  TEllipsis extends boolean,
  
> = {
  [K in keyof TStr]: [K, TStr[K]]
};


// IfEqual<
//   StrLen<TStr>, TMaxLen,
//   // done
//   IfTrue<
//     TEllipsis,
//     Concat<[TStr, "..."]>,
//     TStr
//   >,
//   // recurse
//   _Truncate<
//     AfterFirst<TStr>,
//     TMaxLen,
//     TEllipsis
//   >
// >;

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
    _Truncate<TStr, TMaxLen, TEllipsis>,
    // no truncation required
    TStr
  >
>;


type _T = Truncate<"foobar", 2>;
