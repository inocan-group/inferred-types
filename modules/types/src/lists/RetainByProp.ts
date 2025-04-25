import type {
    As,
    AsUnion,
    Compare,
    ComparisonLookup,
    ComparisonOperation,
    Flexy,
    Get,
    IfNever,
    IsDotPath,
    RemoveNever,
    Throw,
} from "inferred-types/types";

/**
 * Iterates over each element of the Tuple
 */
type SingleFilter<
    TList extends readonly unknown[],
    TComparator,
    TProp extends string,
    TOp extends ComparisonOperation,
    Result extends unknown[] = [],
> = TList extends [infer Head, ...infer Rest]
    ? [Compare<
        Get<Head, TProp>,
        TOp,
        As<TComparator, Flexy<ComparisonLookup[TOp]["params"]>>
    >] extends [true]
        ? SingleFilter<Rest, TComparator, TProp, TOp, [...Result, Head]>
        : SingleFilter<Rest, TComparator, TProp, TOp, Result> // filter out
    : Result;

type Process<
    TList extends unknown[] | readonly unknown[],
    TComparator,
    TProp extends string,
    TOp extends ComparisonOperation,
> = TList extends unknown[]
    ? SingleFilter<TList, TComparator, TProp, TOp>
    : // readonly only tuples
    TList extends readonly unknown[]
        ? Readonly<
            SingleFilter<[...TList], TComparator, TProp, TOp>
        >
        : never;

/**
 * **RetainByProp**`<TList, TComparator, TProp, [TOp]>`
 *
 * Allows a known tuple `TList` to be reduced to a subset with the value `TComparator`
 * being compared to each element in TList[TProp]; if comparison resolves to a `true`
 * value then the element `TList[TProp]` is preserved
 * but otherwise removed.
 *
 * - How the list is _compared_ depends on `TOp` which defaults to "extends"
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
 * - `TComparator` can be single value or a Tuple of values
 * - in the case of a Tuple of values being found in `TComparator`, an "OR" operation
 * will be used ... meaning that the elements in `TList` will be kept if an element
 * extends _any_ of the `TFilter` entries
 * - any non-container based value in `TList` will be discarded
 *
 * **Related:** `FilterByProp`, `Filter`, `RetainFromList`, `RemoveFromList`
 */
export type RetainByProp<
    TList extends readonly unknown[],
    TComparator,
    TProp extends string,
    TOp extends ComparisonOperation = "extends",
> = IsDotPath<TProp> extends false
    ? Throw<"invalid-dot-path", `the property value TProp must be a valid dotpath but "${TProp}" is not valid!`>

    : TList extends readonly unknown[]
        ? IfNever<
            TComparator,
            RemoveNever<TList>,
            Process<
                TList,
                AsUnion<TComparator>,
                TProp,
                TOp
            >
        >
        : never;
