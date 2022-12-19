

type FTuple<
  TTuple extends any[] | readonly any[],
  TFilter,
  Result extends any[] = []
> =  TTuple extends [infer A, ...infer R]
? [A] extends [TFilter]
  ? FTuple<R, TFilter, Result>
  : FTuple<R, TFilter, [...Result, A]>
: Result;


/**
 * **FilterTuple**
 *
 * Allows a known tuple `T` to be _filtered down_ by eliminating all items
 * in the Tuple that _extend_ type `F`
 * ```ts
 * type T = [1,"foo",3];
 * // [1,3]
 * type T2 = FilterTuple<T, string>;
 * ```
 */
export type FilterTuple<
  TTuple extends any[] | readonly any[],
  TFilter,
> = TTuple extends any[]
  ? FTuple<TTuple, TFilter>
  : TTuple extends readonly any[]
    ? Readonly<FTuple<[...TTuple], TFilter>>
    : never;