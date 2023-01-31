import { AfterFirst } from "./AfterFirst";
import { RemoveExtends, RemoveNever, RetainExtends, RetainNotExtends } from "./extractors";
import { FilterNarrow } from "./FilterNarrow";
import { First } from "./First";

/**
 * Operations which can be used with the `Filter` type utility
 */
export type FilterOps = "equals" | "not-equal" | "extends" | "does-not-extend";

/**
 * Iterates over each element of the Tuple and checks on single filter value
 */
type SingleFilter<
  TList extends any[] | readonly any[],
  TFilter,
  TOp extends FilterOps,
  Result extends any[] = []
> = TList extends [infer Head, ...infer Rest]
  ? TOp extends "extends" 
  ? [Head] extends [TFilter]
      ? SingleFilter<Rest, TFilter, TOp, [...Result, Head]>
      : SingleFilter<Rest, TFilter, TOp, Result> // filter out
  : [Head] extends [TFilter] // does not extend
      ? SingleFilter<Rest, TFilter, TOp, Result> // filter out
      : SingleFilter<Rest, TFilter, TOp, [...Result, Head]>
  : RemoveNever<Result>;


type MultiFilter<
  TList extends readonly any[],
  TFilter extends readonly any[],
  TOp extends FilterOps,
  TResults extends readonly any[] = []
> = [] extends TFilter
  ? RemoveNever<TResults>
  : MultiFilter<
      TList,
      AfterFirst<TFilter>,
      TOp,
      [
        ...TResults,
        ...(
          TOp extends "does-not-extend"
            ? RetainNotExtends<
                TList, 
                First<TFilter>
              >
            : RetainExtends<
                TList,
                First<TFilter>
              >
        ), 
      ]
    >;



/**
 * **Filter**`<TList, TFilter, [TOp]>`
 *
 * Allows a known tuple `TList` to be reduced to a subset with the value `TFilter`
 * and a comparison operator represented by `TOp`. 
 * 
 * By default `TOp` is set to _extends_ which ensures that those values in the list which
 * _extend_ `TValue` are retained but the remaining filtered out.
 * 
 * ```ts
 * type T = [1,"foo",3];
 * // [1,3]
 * type T2 = Filter<T, number>;
 * ```
 * - `TFilter` can be single value or a Tuple of values
 * - in the case of a Tuple of values, an "OR" operation will be used ... meaning that 
 * the elements in `TList` will be kept if an element extends _any_ of the `TFilter`
 * entries
 */
export type Filter<
  TList extends any[] | readonly any[],
  TValue,
  TOp extends FilterOps = "extends"
> = TOp extends "equals"
  ? FilterNarrow<TList, TValue, TOp>
  : TOp extends "does-not-equal"
    ? FilterNarrow<TList, TValue, TOp>
    : TList extends any[]
  ? // regular tuples are kept as such
    TValue extends readonly any[]
      // filters are an array
      ? MultiFilter<TList, TValue, TOp>
      // single filter
      : SingleFilter<TList, TValue, TOp>
  : // readonly only tuples are maintained as such
    TList extends readonly any[]
      ? Readonly<
          TValue extends readonly any[]
            ? MultiFilter<TList, TValue, TOp>
            : SingleFilter<[...TList], TValue, TOp>
        >
      : never;
