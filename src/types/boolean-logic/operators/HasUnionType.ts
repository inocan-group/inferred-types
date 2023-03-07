import { AfterFirst, First } from "src/types/lists";
import { IfUnion } from "src/types/boolean-logic/branching";

type _HasUnion<
  TList extends readonly unknown[]
> = [] extends TList
  ? false
  : IfUnion<First<TList>, true, _HasUnion<AfterFirst<TList>>>;

/**
 * **HasUnionType**`<TList>`
 * 
 * Checks whether a list of items includes a value in it which is a _union type_.
 */
export type HasUnionType<TList extends readonly unknown[]> = _HasUnion<TList>;
