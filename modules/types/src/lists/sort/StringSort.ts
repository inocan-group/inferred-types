import type {
    As,
    CodePointOf,
    Container,
    EmptyObject,
    Get,
    IsEqual,
    IsStringLiteral,
    IsWideString,
    Length,
    LessThan,
    Reverse
} from "inferred-types/types";

export interface StringSortOptions<
    TOrder extends "ASC" | "DESC" | "Natural" | undefined = "ASC" | "DESC" | "Natural" | undefined,
    TOffset extends string | undefined = string | undefined,
> {
    order?: TOrder;
    offset?: TOffset;
    start?: unknown;
    end?: unknown;
}

// Internal test hook (not part of public API)
// (no exported debug types)

/**
 * Convert value to string for comparison purposes
 */
type ToComparisonString<T> = T extends string
    ? T
    : T extends number
        ? `${T}`
        : T extends boolean
            ? T extends true ? "true" : "false"
            : never;

/** Mixed type comparison - converts to strings for comparison but handles positioning */
type MixedLessThan<A, B> = 
    A extends string | number | boolean
        ? B extends string | number | boolean
            ? StringLessThan<ToComparisonString<A>, ToComparisonString<B>>
            : true  // Comparable types come before non-comparable
        : B extends string | number | boolean
            ? false // Non-comparable comes after comparable
            : false; // Non-comparable vs non-comparable - maintain order

/** Lexicographic string comparison honoring wide strings as greatest */
type StringLessThan<A extends string, B extends string>
    = A extends B ? false
        : IsWideString<A> extends true
            ? IsWideString<B> extends true
                ? false
                : false
            : IsWideString<B> extends true
                ? true
                : A extends `${infer AFirst}${infer ARest}`
                    ? B extends `${infer BFirst}${infer BRest}`
                        ? AFirst extends BFirst
                            ? StringLessThan<ARest, BRest>
                            : CodePointOf<AFirst> extends infer AC
                                ? CodePointOf<BFirst> extends infer BC
                                    ? AC extends number
                                        ? BC extends number
                                            ? LessThan<AC, BC>
                                            : false
                                        : false
                                    : false
                                : false
                        : false
                    : true;

type StringGreaterThan<A extends string, B extends string>
    = StringLessThan<A, B> extends true
        ? false
        : A extends B
            ? false
            : true;

/**
 * Filter values that are less than or equal to the pivot (supports mixed types)
 */
type FilterMixedLessThanOrEqual<
    TPivot,
    TValues extends readonly unknown[],
    TOut extends readonly unknown[] = [],
> = TValues extends readonly [infer Head, ...infer Tail extends readonly unknown[]]
    ? MixedLessThan<Head, TPivot> extends true
        ? FilterMixedLessThanOrEqual<TPivot, Tail, [...TOut, Head]>
        : Head extends TPivot
            ? FilterMixedLessThanOrEqual<TPivot, Tail, [...TOut, Head]>
            : FilterMixedLessThanOrEqual<TPivot, Tail, TOut>
    : TOut;

/**
 * Filter values that are greater than the pivot (supports mixed types)
 */
type FilterMixedGreaterThan<
    TPivot,
    TValues extends readonly unknown[],
    TOut extends readonly unknown[] = [],
> = TValues extends readonly [infer Head, ...infer Tail extends readonly unknown[]]
    ? MixedGreaterThan<Head, TPivot> extends true
        ? FilterMixedGreaterThan<TPivot, Tail, [...TOut, Head]>
        : FilterMixedGreaterThan<TPivot, Tail, TOut>
    : TOut;

type MixedGreaterThan<A, B> = 
    MixedLessThan<A, B> extends true
        ? false
        : A extends B
            ? false
            : true;

/**
 * Quicksort implementation for mixed types (string, number, boolean)
 */
type _SortMixed<
    TValues extends readonly unknown[],
    TReverse extends boolean,
> = TValues extends readonly [infer Head, ...infer Tail extends readonly unknown[]]
    ? TReverse extends true
        ? [
            ..._SortMixed<
                FilterMixedGreaterThan<Head, Tail>,
                TReverse
            >,
            Head,
            ..._SortMixed<
                FilterMixedLessThanOrEqual<Head, Tail>,
                TReverse
            >,
        ]
        : [
            ..._SortMixed<
                FilterMixedLessThanOrEqual<Head, Tail>,
                TReverse
            >,
            Head,
            ..._SortMixed<
                FilterMixedGreaterThan<Head, Tail>,
                TReverse
            >,
        ]
    : [];

/**
 * Helper to filter containers by offset value comparison
 */
type FilterContainersStringLessThanOrEqual<
    TVal extends Container,
    TOffset extends string,
    TContainers extends readonly Container[],
    TOut extends readonly Container[] = []
> = TContainers extends readonly [infer Head extends Container, ...infer Tail extends readonly Container[]]
    ? StringLessThan<
        As<Get<Head, TOffset>, string>,
        As<Get<TVal, TOffset>, string>
    > extends true
        ? FilterContainersStringLessThanOrEqual<TVal, TOffset, Tail, [...TOut, Head]>
        : As<Get<Head, TOffset>, string> extends As<Get<TVal, TOffset>, string>
            ? FilterContainersStringLessThanOrEqual<TVal, TOffset, Tail, [...TOut, Head]>
            : FilterContainersStringLessThanOrEqual<TVal, TOffset, Tail, TOut>
    : TOut;

type FilterContainersStringGreaterThan<
    TVal extends Container,
    TOffset extends string,
    TContainers extends readonly Container[],
    TOut extends readonly Container[] = []
> = TContainers extends readonly [infer Head extends Container, ...infer Tail extends readonly Container[]]
    ? StringGreaterThan<
        As<Get<Head, TOffset>, string>,
        As<Get<TVal, TOffset>, string>
    > extends true
        ? FilterContainersStringGreaterThan<TVal, TOffset, Tail, [...TOut, Head]>
        : FilterContainersStringGreaterThan<TVal, TOffset, Tail, TOut>
    : TOut;

/**
 * Sort containers by string offset
 */
type _SortStringOffset<
    TContainers extends readonly Container[],
    TOffset extends string,
> = TContainers extends readonly [infer Head extends Container, ...infer Rest extends readonly Container[]]
    ? [
        ..._SortStringOffset<
            FilterContainersStringLessThanOrEqual<Head, TOffset, Rest>,
            TOffset
        >,
        Head,
        ..._SortStringOffset<
            FilterContainersStringGreaterThan<Head, TOffset, Rest>,
            TOffset
        >,
    ]
    : [];

/**
 * Partition mixed types: strings into narrow/wide, others stay as-is
 */
type PartitionWide<
    T extends readonly unknown[],
    TNarrow extends readonly unknown[] = [],
    TWide extends readonly unknown[] = []
> = T extends readonly [infer Head, ...infer Tail extends readonly unknown[]]
    ? Head extends string
        ? IsWideString<Head> extends true
            ? PartitionWide<Tail, TNarrow, [...TWide, Head]>
            : PartitionWide<Tail, [...TNarrow, Head], TWide>
        : PartitionWide<Tail, [...TNarrow, Head], TWide> // Non-strings go to narrow
    : { narrow: TNarrow; wide: TWide };

/**
 * Extract first elements from array (supports mixed types)
 */
type ExtractFirst<
    T extends readonly unknown[],
    TFirst,
    TOut extends readonly unknown[] = []
> = TFirst extends readonly unknown[]
    ? T extends readonly [infer Head, ...infer Tail extends readonly unknown[]]
        ? Head extends TFirst[number]
            ? ExtractFirst<Tail, TFirst, [...TOut, Head]>
            : ExtractFirst<Tail, TFirst, TOut>
        : TOut
    : T extends readonly [infer Head, ...infer Tail extends readonly unknown[]]
        ? Head extends TFirst
            ? ExtractFirst<Tail, TFirst, [...TOut, Head]>
            : ExtractFirst<Tail, TFirst, TOut>
        : TOut;

/**
 * Remove first elements from array (supports mixed types)
 */
type RemoveFirst<
    T extends readonly unknown[],
    TFirst,
    TOut extends readonly unknown[] = []
> = TFirst extends readonly unknown[]
    ? T extends readonly [infer Head, ...infer Tail extends readonly unknown[]]
        ? Head extends TFirst[number]
            ? RemoveFirst<Tail, TFirst, TOut>
            : RemoveFirst<Tail, TFirst, [...TOut, Head]>
        : TOut
    : T extends readonly [infer Head, ...infer Tail extends readonly unknown[]]
        ? Head extends TFirst
            ? RemoveFirst<Tail, TFirst, TOut>
            : RemoveFirst<Tail, TFirst, [...TOut, Head]>
        : TOut;

/**
 * **StringSort**`<T, [O]>`
 *
 * Sorts a string based tuple `T` or containers with string properties.
 *
 * - by default it sorts in ascending order; set `order` to `DESC` for descending or `Natural` to preserve original order
 * - wide string types are always pushed to the end
 * - supports pinning with `start` and `end`
 * - supports container/offset sorting
 */
export type StringSort<
    T extends readonly (string | number | boolean | Container)[],
    O extends StringSortOptions = EmptyObject,
> = IsStringLiteral<O["offset"]> extends true
    ? T extends readonly Container[]
        ? (O extends { order: infer Ord } ? Ord : undefined) extends infer OOrder
            ? [IsEqual<OOrder, "Natural">] extends [true]
                ? T // Keep original order for Natural
                : [IsEqual<OOrder, "DESC">] extends [true]
                    ? Reverse<_SortStringOffset<T, As<O["offset"], string>>>
                    : _SortStringOffset<T, As<O["offset"], string>>
            : never
        : never // Cannot use offset with non-container types
    : T extends readonly (string | number | boolean)[]
        ? Length<T> extends 0
            ? T
            : Length<T> extends 1
                ? T
                : O extends { start: unknown }
                    ? O extends { end: unknown }
                        ? _StringSortWithStartAndEnd<T, O>
                        : _StringSortWithFirst<T, O>
                    : O extends { end: unknown }
                        ? _StringSortWithEnd<T, O>
                        : _StringSortMain<T, O>
        : never; // Type must be string array when no offset is specified

/**
 * Main sorting logic without first elements
 */
type _StringSortMain<
    T extends readonly unknown[],
    O extends StringSortOptions,
    OOrder = O extends { order: infer Ord } ? Ord : undefined,
    TPart = PartitionWide<T>,
    TNatural extends readonly unknown[] = TPart extends { narrow: infer N; wide: infer W }
        ? N extends readonly unknown[]
            ? W extends readonly unknown[]
                ? [...N, ...W]
                : N
            : []
        : [],
    TSorted extends readonly unknown[] = [IsEqual<OOrder, "Natural">] extends [true]
        ? TNatural
        : _SortMixed<
            T,
            [IsEqual<OOrder, "DESC">] extends [true] ? true : false
        >
> = TSorted;

/**
 * Sorting logic with first elements
 */
type _StringSortWithFirst<
    T extends readonly unknown[],
    O extends StringSortOptions,
    OOrder = O extends { order: infer Ord } ? Ord : undefined,
    TStart = O["start"] extends readonly unknown[] ? O["start"] : [O["start"]] extends readonly [infer S] ? S : O["start"],
    TStartElements extends readonly unknown[] = ExtractFirst<T, TStart>,
    TRemainingElements extends readonly unknown[] = RemoveFirst<T, TStart>,
    TPart = PartitionWide<TRemainingElements>,
    TNatural extends readonly unknown[] = TPart extends { narrow: infer N; wide: infer W }
        ? N extends readonly unknown[]
            ? W extends readonly unknown[]
                ? [...N, ...W]
                : N
            : []
        : [],
    TSorted extends readonly unknown[] = [IsEqual<OOrder, "Natural">] extends [true]
        ? TNatural
        : _SortMixed<
            TRemainingElements,
            [IsEqual<OOrder, "DESC">] extends [true] ? true : false
        >
> = [...TStartElements, ...TSorted];

/**
 * Sorting logic with end elements
 */
type _StringSortWithEnd<
    T extends readonly unknown[],
    O extends StringSortOptions,
    OOrder = O extends { order: infer Ord } ? Ord : undefined,
    TEnd = O["end"] extends readonly unknown[] ? O["end"] : [O["end"]] extends readonly [infer E] ? E : O["end"],
    TEndElements extends readonly unknown[] = ExtractFirst<T, TEnd>,
    TRemainingElements extends readonly string[] = RemoveFirst<T, TEnd>,
    TPart = PartitionWide<TRemainingElements>,
    TNatural extends readonly unknown[] = TPart extends { narrow: infer N; wide: infer W }
        ? N extends readonly unknown[]
            ? W extends readonly unknown[]
                ? [...N, ...W]
                : N
            : []
        : [],
    TSorted extends readonly unknown[] = [IsEqual<OOrder, "Natural">] extends [true]
        ? TNatural
        : _SortMixed<
            TRemainingElements,
            [IsEqual<OOrder, "DESC">] extends [true] ? true : false
        >
> = [...TSorted, ...TEndElements];

/**
 * Sorting logic with both start and end elements
 */
type _StringSortWithStartAndEnd<
    T extends readonly unknown[],
    O extends StringSortOptions,
    OOrder = O extends { order: infer Ord } ? Ord : undefined,
    TStart = O["start"] extends readonly unknown[] ? O["start"] : [O["start"]] extends readonly [infer S] ? S : O["start"],
    TEnd = O["end"] extends readonly unknown[] ? O["end"] : [O["end"]] extends readonly [infer E] ? E : O["end"],
    TStartElements extends readonly string[] = ExtractFirst<T, TStart>,
    TEndElements extends readonly string[] = ExtractFirst<RemoveFirst<T, TStart>, TEnd>,
    TRemainingElements extends readonly string[] = RemoveFirst<RemoveFirst<T, TStart>, TEnd>,
    TPart = PartitionWide<TRemainingElements>,
    TNatural extends readonly unknown[] = TPart extends { narrow: infer N; wide: infer W }
        ? N extends readonly unknown[]
            ? W extends readonly unknown[]
                ? [...N, ...W]
                : N
            : []
        : [],
    TSorted extends readonly unknown[] = [IsEqual<OOrder, "Natural">] extends [true]
        ? TNatural
        : _SortMixed<
            TRemainingElements,
            [IsEqual<OOrder, "DESC">] extends [true] ? true : false
        >
> = [...TStartElements, ...TSorted, ...TEndElements];
