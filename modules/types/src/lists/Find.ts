import type {
    AfterFirst,
    Compare,
    ComparisonAccept,
    ComparisonOperation,
    Err,
    First,
    GetComparisonParamInput,
    IsUnion
} from "inferred-types/types";

type FindAcc<
    TList extends readonly (ComparisonAccept<TOp>)[],
    TOp extends ComparisonOperation,
    TParams extends GetComparisonParamInput<TOp>
> = [] extends TList
    ? undefined
    : First<TList> extends ComparisonAccept<TOp>
        ? Compare<First<TList>, TOp, TParams> extends true
            ? First<TList>
            : FindAcc<AfterFirst<TList>, TOp, TParams>
        : never;

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
    TList extends readonly (ComparisonAccept<TOp>)[],
    TOp extends ComparisonOperation,
    TParams extends GetComparisonParamInput<TOp>
> = FindAcc<TList, TOp, TParams>;

/**
 * **FindFunction**`<TOp, TParams>`
 *
 * A partially applied type resulting from a call to the
 * runtime's `find()` utility. This function has a fully
 * configured `Comparator` (aka, an comparison _operation_
 * and one or more parameters to allow valid comparisons
 * to be made).
 */
export type FindFunction<
    /** should be a valid comparison operation */
    TOp extends string,
    TParams extends GetComparisonParamInput<TOp>
> = TOp extends ComparisonOperation
? IsUnion<TOp> extends true
    ? <TVal extends readonly ComparisonAccept<TOp>[]>(val: TVal) => readonly unknown[]

: <const TList extends readonly ComparisonAccept<TOp>[]>(
    list: TList
) => Find<
    TList,
    TOp,
    TParams
>
: Err<"invalid-operation">;
