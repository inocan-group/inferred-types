import type {
    Chars,
    Compare,
    ComparisonLookup,
    ComparisonOperation,
    Increment
} from "inferred-types/types";
import type { AfterFirst, First, Last } from "types/lists";

type _FindIndexes<
    TContent extends readonly unknown[],
    TFind extends ComparisonLookup[TOp]["params"],
    TOp extends ComparisonOperation = "extends",
    TIdx extends number = 0,
    TResults extends readonly number[] = [],
> = [] extends TContent
    ? TResults
    : _FindIndexes<
        AfterFirst<TContent>,
        TFind,
        TOp,
        Increment<TIdx>,
        Compare<First<TContent>, TOp, TFind> extends true
            ? [
                ...TResults,
                TIdx,
            ]
            : TResults
    >;

/**
 * **FindIndexes**
 *
 * Utility which returns all _indexes_ in `TContent`
 * where `TFind` is found.
 *
 * - by default, the comparision operation is "extends" but
 * you can change this with `TOp`.
 * - the content (`TContent`) can be either a string or a tuple
 *
 * **Related:** `FindFirstIndex`, `FindLastIndex`, `FindIndexesWithMeta`
 */
export type FindIndexes<
    TContent extends string | readonly unknown[],
    TFind extends ComparisonLookup[TOp]["params"],
    TOp extends ComparisonOperation = "extends",
> = TContent extends string
    ? _FindIndexes<
        Chars<TContent>,
        TFind,
        TOp
    >
    : TContent extends readonly unknown[]
        ? _FindIndexes<TContent, TFind, TOp>
        : never;

/**
 * **FindFirstIndex**`<TContent,TFind,[TOp]>`
 *
 * Utility which returns the _first_ index in the content
 * which matches the
 */
export type FindFirstIndex<
    TContent extends string | readonly unknown[],
    TFind extends ComparisonLookup[TOp]["params"],
    TOp extends ComparisonOperation = "extends",
> = First<FindIndexes<TContent, TFind, TOp>>;

export type FindLastIndex<
    TContent extends string | readonly unknown[],
    TFind extends ComparisonLookup[TOp]["params"],
    TOp extends ComparisonOperation = "extends",
> = Last<FindIndexes<TContent, TFind, TOp>>;

export interface FindIndexMetaOfString {
    start: number;
    end: number;
    break: unknown;
}

export interface FindIndexMetaOfTuple {
    index: number;

    break: unknown;
}

type _FindIndexesWithMeta__String<
    TOriginal extends readonly unknown[],
    TContent extends readonly unknown[],
    TFind extends ComparisonLookup[TOp]["params"],
    TOp extends ComparisonOperation = "extends",
    TIdx extends number = 0,
    TResults extends readonly FindIndexMetaOfString[] | [] = [],
> = [] extends TContent
    ? TResults
    : _FindIndexesWithMeta__String<
        TOriginal,
        AfterFirst<TContent>,
        TFind,
        TOp,
        Increment<TIdx>,
        Compare<First<TContent>, TOp, TFind> extends true
            ? [
                ...TResults,
                {
                    start: TIdx;
                    end: Increment<TIdx>;
                    break: TOriginal[TIdx];
                },
            ]
            : TResults
    >;

type _FindIndexesWithMeta__Tuple<
    TOriginal extends readonly unknown[],
    TContent extends readonly unknown[],
    TFind extends ComparisonLookup[TOp]["params"],
    TOp extends ComparisonOperation = "extends",
    TIdx extends number = 0,
    TResults extends readonly FindIndexMetaOfTuple[] | [] = [],
> = [] extends TContent
    ? TResults
    : _FindIndexesWithMeta__Tuple<
        TOriginal,
        AfterFirst<TContent>,
        TFind,
        TOp,
        Increment<TIdx>,
        Compare<First<TContent>, TOp, TFind> extends true
            ? [
                ...TResults,
                {
                    index: TIdx;
                    break: TOriginal[TIdx];
                },
            ]
            : TResults
    >;

/**
 * **FindIndexesWithMeta**
 *
 * Utility which returns all _indexes_ in `TContent`
 * where `TFind` is found.
 *
 * - by default, the comparision operation is "extends" but
 * you can change this with `TOp`.
 * - the content (`TContent`) can be either a string or a tuple
 *
 * **Related:** `FindFirstIndex`, `FindLastIndex`
 */
export type FindIndexesWithMeta<
    TContent extends string | readonly unknown[],
    TFind extends ComparisonLookup[TOp]["params"],
    TOp extends ComparisonOperation = "extends",
> = TContent extends string
    ? _FindIndexesWithMeta__String<
        Chars<TContent>,
        Chars<TContent>,
        TFind,
        TOp
    >
    : TContent extends readonly unknown[]
        ? _FindIndexesWithMeta__Tuple<
            TContent,
            TContent,
            TFind,
            TOp
        >
        : never;
