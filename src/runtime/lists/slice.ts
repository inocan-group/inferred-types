import { Slice, Tuple } from "src/types/index";

/**
 * **slice**(list, start, end)
 * 
 * Runtime utility to slice an array while maintaining strong
 * types.
 */
export const slice = <
  TList extends Tuple,
  TStart extends number,
  TEnd extends number
>(list: TList, start: TStart, end: TEnd) => {
  return list.slice(start,end) as Slice<TList,TStart,TEnd>;
};

