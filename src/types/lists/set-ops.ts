import { IfReadonlyArray, IfSomeEqual } from "../boolean-logic";
import { Narrowable } from "../Narrowable";
import { UnionToTuple } from "../type-conversion/UnionToTuple";
import { AfterFirst } from "./AfterFirst";
import { First } from "./First";

type SetRemovalAcc<
  TSet extends readonly any[],
  TRemoval extends readonly any[],
  Processed extends readonly any[] = [],
> = [] extends TSet
  ? Processed
  : IfSomeEqual<
      First<TSet>, TRemoval,
      SetRemovalAcc<AfterFirst<TSet>, TRemoval, Processed>,
      SetRemovalAcc<AfterFirst<TSet>, TRemoval, readonly [...Processed, First<TSet>]>
    >;

export type SetInput<T extends Narrowable> = T | readonly T[];

/**
 * **Set**`<T>`
 * 
 * Receives either a readonly array of items or union type which 
 * will be converted into the readonly array.
 * 
 * ```ts
 * // readonly ["foo", "bar", "baz"]
 * type T1 = Set<"foo" | "bar" | "baz">;
 * type T2 = Set<["foo", "bar", "baz"]>;
 * ```
 */
export type UniqueSet<T extends readonly any[] | string | number> = IfReadonlyArray<
  T, 
  T extends readonly any[] ? readonly [...T] : never, 
  readonly [...UnionToTuple<T>]
>;

/**
 * **SetRemoval**`<TSet, TRemoval>`
 * 
 * Takes two sets -- `TSet` as the primary set, and `TRemoval` -- and produces the
 * set subtraction of `TSet` minus the elements in `TRemoval`.
 */
export type SetRemoval<
  TSet extends readonly any[] | string | number,
  TRemoval extends readonly any[] | string | number,
> = SetRemovalAcc<UniqueSet<TSet>, UniqueSet<TRemoval>>;


