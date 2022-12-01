import { Equal } from "../combinators/equivalency";
import { AfterFirst, First } from "../lists";
import { Narrowable } from "../Narrowable";

/**
 * **Contains**`<T, A>`
 *
 * Type utility which checks whether a type `T` exists within an array `A`. Result is
 * `true` if `T` _extends_ any element in `A` making it match widely against `A`. If you
 * prefer a narrower match you can use `NarrowlyContains<T,A>` instead.
 */
export type Contains<T extends Narrowable, A extends readonly any[]> = First<A> extends T
  ? true
  : [] extends AfterFirst<A>
  ? false
  : Contains<T, AfterFirst<A>>;

/**
 * **NarrowlyContains**`<T, A>`
 *
 * Type utility which checks whether a type `T` exists within an array `A`. Result is
 * `true` if `T` _extends_ any element in `A` making it match widely against `A`. If you
 * prefer a wider match you can use `Contains<T,A>` instead.
 */
export type NarrowlyContains<T extends Narrowable, A extends readonly any[]> = Equal<
  First<A>,
  T
> extends true
  ? true
  : [] extends AfterFirst<A>
  ? false
  : NarrowlyContains<T, AfterFirst<A>>;
