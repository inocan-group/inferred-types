import type {
    AfterFirst,
    Compare,
    ComparisonAccept,
    ComparisonLookup,
    ComparisonOperation,
    First
} from "inferred-types/types";

type FindAcc<
    TList extends readonly ComparisonAccept<TOp>[],
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"]
> = [] extends TList
    ? undefined
    : Compare<First<TList>, TOp, TParams> extends true
        ? First<TList>
        : FindAcc<AfterFirst<TList>, TOp, TParams>;

/**
 * **Find**`<TList,TOp,TComparator>`
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
 * type T = Find<List, "objectKeyWithValue", ["id", 1]>
 * ```
 */
export type Find<
    TList extends readonly ComparisonAccept<TOp>[],
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"]
> = FindAcc<TList, TOp, TParams>;

export type FindFunction<
    TOp extends ComparisonOperation,
    TParams extends ComparisonLookup[TOp]["params"]
> = <
    TList extends readonly ComparisonAccept<TOp>[]>(list: TList) => Find<
        TList,
        TOp,
        TParams
    >;
