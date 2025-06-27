import type {
    AfterFirst,
    As,
    AsArray,
    Compare,
    ComparisonLookup,
    ComparisonOperation,
    First,
    Flexy,
    If
} from "inferred-types/types";

type FindAcc<
    TList extends readonly unknown[],
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"],
    TDeref extends string | number | null,
> = [] extends TList
    ? undefined
    : TDeref extends keyof First<TList>
        ? If<
            Compare<First<TList>[TDeref], TOp, TParams>,
            First<TList>,
            FindAcc<AfterFirst<TList>, TOp, TParams, TDeref>
        >
        : If<
            Compare<First<TList>, TOp, TParams>,
            First<TList>,
            FindAcc<AfterFirst<TList>, TOp, TParams, TDeref>
        >;

/**
 * **Find**`<TList,TOp,TComparator,[TDeref]>`
 *
 * Type utility used to find the first value in `TList` which _equals_ `TValue`.
 * Will return _undefined_ if no matches found.
 *
 * - use **FindExtends** if you want a more permissive match
 * - by default, values in `TList` will be compared directly but you can _dereference_
 * array and object properties with `TIndex` if you want to compare on a child property
 *
 * ```ts
 * type List = [ { id: 1, value: "hi" }, { id: 2, value: "bye" } ]
 * // { id: 1; value: "hi" }
 * type T = Find<List, 1, "id">
 * ```
 *
 * **Related**: `FindExtends`
 */
export type Find<
    TList extends readonly unknown[],
    TOp extends ComparisonOperation,
    TParams extends Flexy<ComparisonLookup[TOp]["params"]>,
    TDeref extends string | number | null = null,
> = FindAcc<
    TList,
    TOp,
    As<
        AsArray<TParams>,
        ComparisonLookup[TOp]["params"]
    >,
    TDeref
>;
