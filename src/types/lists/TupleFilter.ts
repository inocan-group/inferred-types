import {  IfExtends, IfExtendsSome } from "src/types/boolean-logic";

/**
 * Iterates over each element of the Tuple
 */
type TupleFilterAcc<
  TTuple extends any[] | readonly any[],
  TFilter,
  Result extends any[] = []
> = TTuple extends [infer First, ...infer Rest]
  ? [First] extends [TFilter]
      ? TupleFilterAcc<Rest, TFilter, Result> // filter out
      : TupleFilterAcc<Rest, TFilter, [...Result, First]>
  : Result;

/**
 * Iterates over each element of the Tuple
 */
type TupleFilterSomeAcc<
  TTuple extends any[] | readonly any[],
  TFilter extends readonly any[] | any[],
  Result extends any[] = []
> = TTuple extends [infer First, ...infer Rest]
  ? IfExtendsSome<
      First, TFilter,
      TupleFilterAcc<Rest, TFilter, [...Result, First]>,
      TupleFilterAcc<Rest, TFilter, Result>
    >
  : Result;


/**
 * **TupleFilter**`<TTuple, TFilter>`
 *
 * Allows a known tuple `TTuple` to be _filtered down_ by eliminating all items
 * in the Tuple that _extend_ type `TFilter`.
 * ```ts
 * type T = [1,"foo",3];
 * // [1,3]
 * type T2 = TupleFilter<T, string>;
 * ```
 * - `TFilter` can be single value or a Tuple of values
 *    - in the case of a Tuple of values, an "OR" operation will be used ... meaning that 
 * the elements in `TTuple` will be kept if an element extends _any_ of the `TFilter`
 * entries
 */
export type TupleFilter<
  TTuple extends any[] | readonly any[],
  TFilter
> = TTuple extends any[]
  ? // regular tuples are kept as such
    IfExtends<
      TFilter, readonly any[] | any[],
      // filters are an array
      TupleFilterSomeAcc<TTuple, TFilter & (readonly any[] | any[])>, 
      // single filter
      TupleFilterAcc<TTuple, TFilter>
    >
  : // readonly only tuples are maintained as such
    TTuple extends readonly any[]
      ? Readonly<
          IfExtends<
            TFilter, readonly any[] | any[],
            TupleFilterSomeAcc<[...TTuple], TFilter & (readonly any[] | any[])>, 
            TupleFilterAcc<[...TTuple], TFilter>
          >
        >
      : never;



/**
 * **ExcludeNever**`<T>`
 * 
 * Filters type `T` to have no `never` types
 */
export type ExcludeNever<T extends readonly any[]> = TupleFilter<T, never>;
