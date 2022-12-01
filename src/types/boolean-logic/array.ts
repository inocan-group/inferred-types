import { Equal } from "../combinators/equivalency";
import { AfterFirst, First } from "../lists";
import { Narrowable } from "../Narrowable";

export type IsArray<T> = [T] extends [any[]] ? true : false;

/**
 * **IfArray**`<T, IF, ELSE>`
 *
 * Type utility which convert to type `IF` or `ELSE` based on whether `T` is an array
 */
export type IfArray<T, IF, ELSE> = IsArray<T> extends true ? IF : ELSE;

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
