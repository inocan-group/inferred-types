import { AfterFirst , First } from "..";

/**
 * Iterates over each element of the Tuple
 */
type SingleFilter<
  TList extends unknown[] | readonly unknown[],
  TFilter,
  Result extends unknown[] = []
> = TList extends [infer Head, ...infer Rest]
  ? [Head] extends [TFilter]
    ? SingleFilter<Rest, TFilter, [...Result, Head]>
    : SingleFilter<Rest, TFilter, Result> // filter out
  : Result;

type Extraction<
  TList extends readonly unknown[],
  TExtract extends readonly unknown[],
  TResults extends readonly unknown[] = [],
> = [] extends TExtract
  ? TResults
  : Extraction<
      TList, 
      AfterFirst<TExtract>, 
      [...TResults, ...SingleFilter<TList, First<TExtract>>]
    >;

/**
 * **Retain**`<TList, TFilter>`
 * 
 * Allows a known tuple `TList` to be reduced to just those elements which 
 * _extend_ type `TFilter`.
 * 
 * - `TFilter` can be single value or a array of values
 * - when the filter is an array then they are combined in a logical OR operation
 */
export type Retain<
  TList extends unknown[] | readonly unknown[],
  TFilter
> = TList extends unknown[]
  ? // regular tuples are kept as such
    TFilter extends readonly unknown[]
      // filters are an array
      ? Extraction<TList, TFilter>
      // single filter
      : SingleFilter<TList, TFilter>
  : // readonly only tuples are maintained as such
    TList extends readonly unknown[]
      ? Readonly<
          TFilter extends readonly unknown[]
            ? Extraction<TList, TFilter>
            : SingleFilter<[...TList], TFilter>
        >
      : never;
