import { Narrowable, RetainFromList, UnionToTuple } from "src/types/index";

/**
 * Operations which can be used with the `Filter` type utility
 */
export type FilterOps = "equals" | "not-equal" | "extends" | "extends(unionize)" | "does-not-extend" | "does-not-extend(unionize)";

/**
 * **Filter**`<TList, TFilter, [TOp]>`
 *
 * Allows a known tuple `TList` to be reduced to a subset with the value `TFilter`
 * and a comparison operator represented by `TOp`. 
 * 
 * By default `TOp` is set to _extends_ which ensures that those values in the list which
 * _extend_ `TValue` are retained but the remaining filtered out.
 * 
 * ```ts
 * type T = [1,"foo",3];
 * // [1,3]
 * type T2 = Filter<T, number>;
 * ```
 * - `TFilter` can be single value or a Tuple of values
 * - in the case of a Tuple of values, an "OR" operation will be used ... meaning that 
 * the elements in `TList` will be kept if an element extends _any_ of the `TFilter`
 * entries
 * 
 * **Related:** `RetainFromList`, `RemoveFromList`
 */
export type Filter<
  TList,
  TFilter extends readonly unknown[] | Narrowable,
  TOp extends FilterOps = "extends"
> = TList extends readonly unknown[]
? RetainFromList<TList, TOp, TFilter>
: UnionToTuple<TList> extends readonly unknown[]
  ? RetainFromList<UnionToTuple<TList>, TOp, TFilter>
  : never;
