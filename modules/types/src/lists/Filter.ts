import type {
    ComparatorOperation,
    Compare,
    If,
    IfNever,
    IsArray,
    RemoveNever,
    TupleToUnion,
} from "inferred-types/types";

/**
 * Iterates over each element of the Tuple
 */
type SingleFilter<
    TList extends readonly unknown[],
    TFilter,
    TOp extends ComparatorOperation,
    Result extends unknown[] = [],
> = TList extends [infer Head, ...infer Rest]
    ? [Compare<Head, TOp, TFilter>] extends [true]
        ? SingleFilter<Rest, TFilter, TOp, Result> // filter out
        : SingleFilter<Rest, TFilter, TOp, [...Result, Head]>
    : Result;

type Process<
    TList extends unknown[] | readonly unknown[],
    TFilter,
    TOp extends ComparatorOperation,
> = TList extends unknown[]
    ? SingleFilter<TList, TFilter, TOp>
    : // readonly only tuples
    TList extends readonly unknown[]
        ? Readonly<
            SingleFilter<[...TList], TFilter, TOp>
        >
        : never;

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
    TOp extends ComparatorOperation = "extends",
> = TList extends readonly unknown[]
    ? IfNever<
        TComparator,
        RemoveNever<TList>,
        If<
            IsArray<TComparator>,
            Process<
                TList,
                TupleToUnion<TComparator>,
                TOp
            >,
            Process<
                TList,
                TComparator,
                TOp
            >
        >
    >
    : never;
