import type { AfterFirst, First, IsArray } from "inferred-types/types";

type _HasArray<
  TList extends readonly unknown[],
> = [] extends TList
  ? false
  : IsArray<First<TList>> extends true
    ? true
    : _HasArray<AfterFirst<TList>>;

/**
 * **HasArray**`<TList>`
 *
 * Checks whether a list of items includes an _array_ (tuple or wide array type) within it.
 */
export type HasArray<TList extends readonly unknown[]> = _HasArray<TList>;
