import { AfterFirst, First, Length , IfEqual, IfLength , Contains } from "src/types";

type Compare<
TList extends readonly unknown[],
TComparator extends readonly unknown[]
> = [] extends TComparator
? true
: Contains<TList, First<TComparator>> extends true
  ? Compare<
      TList,
      AfterFirst<TComparator>
    >
  : false;

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
> = IfEqual<
  Length<TList>, Length<TComparator>,
  IfLength<
    TList, 0, // lengths are both 0
    true, 
    Compare<TList,TComparator>
  >,
  false
>;
