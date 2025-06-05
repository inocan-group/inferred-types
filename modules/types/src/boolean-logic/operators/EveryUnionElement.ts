import type {
    And,
    ComparisonOperation,
    Compare,
    IsUnion,
    UnionToTuple,
    ComparisonLookup,
    Flexy,
} from "inferred-types/types";

type UnionComparison<
    TTarget extends readonly unknown[],
    TOp extends ComparisonOperation,
    TComparator extends Flexy<ComparisonLookup[TOp]["params"]>,
    TIf,
    TElse,
> = And<{
    [K in keyof TTarget]: Compare<TTarget[K], TOp, TComparator>
}> extends true
    ? TIf
    : TElse;

/**
 * **EveryUnionElement**`<TTarget, TOp, TComparator, [TIf], [TElse]>`
 *
 * When `TTarget` is a union type:
 *
 *    - compares the elements of `TTarget` using the `TOp` comparison operator to the
 * `TComparator` type
 *    - by default returns boolean true/false based on whether _every_ element in the union
 * matches the comparison
 *    - if you want to create other return values then the default true/value you can
 * modify the `TIf`/`TElse` generics
 *
 * If `TTarget` is _not_ a union type then the same camparison is done on the singular type
 *
 * **Related:** `SomeUnionElement`
 */
export type EveryUnionElement<
    TTarget,
    TOp extends ComparisonOperation,
    TComparator extends Flexy<ComparisonLookup[TOp]["params"]>,
    TIf = true,
    TElse = false,
> = IsUnion<TTarget> extends true
    ? UnionComparison<
        UnionToTuple<TTarget>,
        TOp,
        TComparator,
        TIf,
        TElse
    >
    : Compare<TTarget, TOp, TComparator>;
