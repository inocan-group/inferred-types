import { 
  ComparatorOperation, 
  Compare, 
  IsArray, 
  IfNever, 
  Or,
  If,
  IsEqual,
  TupleToUnion,
  RemoveNever
} from "src/types/index";


/**
 * Iterates over each element of the Tuple
 */
type SingleFilter<
  TList extends readonly unknown[],
  TFilter,
  TOp extends ComparatorOperation,
  Result extends unknown[] = []
> = TList extends [infer Head, ...infer Rest]
  ? [Compare<Head,TOp, TFilter>] extends [true]
    ? SingleFilter<Rest, TFilter, TOp, Result> // filter out
    : SingleFilter<Rest, TFilter, TOp, [...Result, Head]>
  : Result;


type Process<
  TList extends unknown[] | readonly unknown[],
  TFilter,
  TOp extends ComparatorOperation 
> = TList extends unknown[]
? SingleFilter<TList, TFilter, TOp>
: // readonly only tuples 
  TList extends readonly unknown[]
    ? Readonly<
        SingleFilter<[...TList], TFilter, TOp>
      >
    : never;

type PrepList<
    T extends readonly unknown[],
    O extends ComparatorOperation
  > = If<
    Or<[
      IsEqual<O, "contains">,
      IsEqual<O, "startsWith">,
      IsEqual<O, "endsWith">,
    ]>,
    RemoveNever<{
      [K in keyof T]: T[K] extends string | number
        ? T[K]
        : never
    }>,
    T
  >

/**
 * **Filter**`<TList, TComparator, [TOp]>`
 *
 * Allows a known tuple `TList` to be reduced to a subset with the value `TFilter`:
 * 
 * - How the list is reduced depends on `TOp` which defaults to "extends"
 * - other values include "equals", "does-not-extend", "does-not-equal"
 * 
 * By default `TOp` is set to _extends_ which ensures that those values in the list which
 * _extend_ `TValue` are retained but the remaining filtered out.
 * 
 * ```ts
 * type T = [1,"foo",3];
 * // [1,3]
 * type T2 = Filter<T, string>;
 * ```
 * - `TFilter` can be single value or a Tuple of values
 * - in the case of a Tuple of values, an "OR" operation will be used ... meaning that 
 * the elements in `TList` will be kept if an element extends _any_ of the `TFilter`
 * entries
 * 
 * **Related:** `RetainFromList`, `RemoveFromList`
 */
export type Filter<
  TList extends readonly unknown[],
  TComparator,
  TOp extends ComparatorOperation = "extends"
> = PrepList<TList, TOp> extends readonly unknown[]
? IfNever<
    TComparator,
    RemoveNever<TList>,
    If<
      IsArray<TComparator>, 
      Process<
        PrepList<TList, TOp>,
        TupleToUnion<TComparator>,
        TOp
      >,
      Process<
        PrepList<TList, TOp>,
        TComparator,
        TOp
      >
    >
  >
: never;
