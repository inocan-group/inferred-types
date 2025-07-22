import type { AsArray } from "inferred-types/types";

type _ExcludeIndexHelper<
    TList extends readonly unknown[],
    TIdx extends readonly number[],
    Count extends readonly unknown[],
    Output extends readonly unknown[]
>
  = TList extends readonly [infer First, ...infer Rest]
      ? /* if current index (Count['length']) is in the TIdx union, skip First */
      Count["length"] extends TIdx[number]
          ? _ExcludeIndexHelper<Rest, TIdx, [...Count, unknown], Output>
      /* otherwise, include First in Output */
          : _ExcludeIndexHelper<Rest, TIdx, [...Count, unknown], [...Output, First]>
  /* when we've walked the whole tuple, return what we've accumulated */
      : Output;

/**
 * **ExcludeIndex****`<TList, TIdx>`
 *
 * Given a tuple `TList` and a singular index or tuple of indices `TIdx`,
 * returns a new tuple with the elements at those indices removed.
 */
export type ExcludeIndex<
    TList extends readonly unknown[],
    TIdx extends number | readonly number[]
> = _ExcludeIndexHelper<TList, AsArray<TIdx>, [], []>;
