import type { Narrowable, Slice } from "inferred-types/types";

/**
 * **slice**(list, start, end)
 *
 * Runtime utility to slice an array while maintaining strong
 * types.
 */
export function slice<
  TList extends readonly N[],
  N extends Narrowable,
  TStart extends number,
  TEnd extends number,
>(
  list: TList,
  start: TStart,
  end: TEnd,
) {
  return list.slice(start, end) as unknown as Slice<TList, TStart, TEnd>;
}
