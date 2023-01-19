import { AfterFirst } from "./AfterFirst";
import { RemoveExtends } from "./extractors";
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
      ? SingleFilter<Rest, TFilter, Result> // filter out
      : SingleFilter<Rest, TFilter, [...Result, Head]>
  : Result;

type Extraction<
  TList extends readonly any[],
  TExtract extends readonly any[],
> = [] extends TExtract
  ? TList
  : Extraction<RemoveExtends<TList, First<TExtract>>, AfterFirst<TExtract>>;



/**
 * **Filter**`<TList, TFilter>`
 *
 * Allows a known tuple `TList` to be _filtered down_ by eliminating all items
 * in the Tuple that _extend_ type `TFilter`.
 * ```ts
 * type T = [1,"foo",3];
 * // [1,3]
 * type T2 = TupleFilter<T, string>;
 * ```
 * - `TFilter` can be single value or a Tuple of values
 * - in the case of a Tuple of values, an "OR" operation will be used ... meaning that 
 * the elements in `TList` will be kept if an element extends _any_ of the `TFilter`
 * entries
 */
export type Filter<
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
