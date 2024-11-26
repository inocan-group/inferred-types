import { AfterFirst, First,  IsUnion } from "inferred-types/types";

type _HasUnion<
  TList extends readonly unknown[]
> = [] extends TList
  ? false
  : IsUnion<First<TList>> extends true
      ? true
      : _HasUnion<AfterFirst<TList>>;

/**
 * **HasUnionType**`<TList>`
 *
 * Checks whether a list of items includes a value in it which is a _union type_.
 */
export type HasUnionType<TList extends readonly unknown[]> = _HasUnion<TList>;
