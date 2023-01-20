import { AfterFirst } from "./AfterFirst";
import { First } from "./First";

/**
 * Iterates over each element of the Tuple
 */
type SingleFilter<
  TList extends any[] | readonly any[],
  TFilter,
  Result extends any[] = []
> = TList extends [infer Head, ...infer Rest]
  ? [Head] extends [TFilter]
    ? SingleFilter<Rest, TFilter, [...Result, Head]>
    : SingleFilter<Rest, TFilter, Result> // filter out
  : Result;

type Extraction<
  TList extends readonly any[],
  TExtract extends readonly any[],
  TResults extends readonly any[] = [],
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
  TList extends any[] | readonly any[],
  TFilter
> = TList extends any[]
  ? // regular tuples are kept as such
    TFilter extends readonly any[]
      // filters are an array
      ? Extraction<TList, TFilter>
      // single filter
      : SingleFilter<TList, TFilter>
  : // readonly only tuples are maintained as such
    TList extends readonly any[]
      ? Readonly<
          TFilter extends readonly any[]
            ? Extraction<TList, TFilter>
            : SingleFilter<[...TList], TFilter>
        >
      : never;
