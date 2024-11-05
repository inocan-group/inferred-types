import { AfterFirst, First , IsEqual } from "inferred-types/dist/types/index";

/**
 * **NarrowlyContains**`<TList, TContains>`
 *
 * Type utility which checks whether a type `T` exists within an
 * array `A`. Result is `true` if `T` _extends_ any element in
 * `A` making it match widely against `A`. If you prefer a wider
 * match you can use `Contains<T,A>` instead.
 *
 * **Related:** `Contains`, `ContainsAll`, `ContainsSome`
 */
export type NarrowlyContains<
  TList extends readonly unknown[],
  TContains,
> = IsEqual<
  First<TList>,
  TContains
> extends true
  ? true
  : [] extends AfterFirst<TList>
  ? false
  : NarrowlyContains<AfterFirst<TList>, TContains>;
