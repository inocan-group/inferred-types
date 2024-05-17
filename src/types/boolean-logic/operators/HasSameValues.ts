import { And, Or } from "src/types/index";

type Find<
  TList extends readonly unknown[],
  TComparator
> = Or<{
  [K in keyof TList]: [TList[K]] extends [TComparator] ? true : false
}>;

type Compare<
  TList extends readonly unknown[],
  TComparator extends readonly unknown[]
> = And<{
  [K in keyof TList]: Find<TComparator, TList[K]> extends boolean
    ? Find<TComparator, TList[K]>
    : never
}, true>

/**
 * **HasSameValues**`<TList,TComparator>`
 * 
 * Boolean type utility which determines if the values in
 * `TList` and `TComparator` are the same (even if the order
 * is different). 
 */
export type HasSameValues<
  TList extends readonly unknown[],
  TComparator extends readonly unknown[]
> = TList["length"] extends TComparator["length"]
? Compare<
    TList,
    TComparator
  >
: false;
