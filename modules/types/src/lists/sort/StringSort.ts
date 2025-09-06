import type {
    As,
    Container,
    EmptyObject,
    Get,
    IsEqual,
    IsStringLiteral,
    IsWideString,
    Length,
    Reverse,
    CodePointOf,
    LessThan,
    IsDefined
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
 * Filter strings that are less than or equal to the pivot
 */
type FilterStringLessThanOrEqual<
    TPivot extends string,
    TValues extends readonly string[],
    TOut extends readonly string[] = [],
> = TValues extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
    ? StringLessThan<Head, TPivot> extends true
        ? FilterStringLessThanOrEqual<TPivot, Tail, [...TOut, Head]>
        : Head extends TPivot
            ? FilterStringLessThanOrEqual<TPivot, Tail, [...TOut, Head]>
            : FilterStringLessThanOrEqual<TPivot, Tail, TOut>
    : TOut;

/**
 * Filter strings that are greater than the pivot
 */
type FilterStringGreaterThan<
    TPivot extends string,
    TValues extends readonly string[],
    TOut extends readonly string[] = [],
> = TValues extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
    ? StringGreaterThan<Head, TPivot> extends true
        ? FilterStringGreaterThan<TPivot, Tail, [...TOut, Head]>
        : FilterStringGreaterThan<TPivot, Tail, TOut>
    : TOut;

/**
 * Quicksort implementation for strings
 */
type _SortStrings<
    TValues extends readonly string[],
    TReverse extends boolean,
> = TValues extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
    ? TReverse extends true
        ? [
            ..._SortStrings<
                FilterStringGreaterThan<Head, Tail>,
                TReverse
            >,
            Head,
            ..._SortStrings<
                FilterStringLessThanOrEqual<Head, Tail>,
                TReverse
            >,
        ]
        : [
            ..._SortStrings<
                FilterStringLessThanOrEqual<Head, Tail>,
                TReverse
            >,
            Head,
            ..._SortStrings<
                FilterStringGreaterThan<Head, Tail>,
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
 * Partition a tuple of strings into narrow and wide (in original order)
 */
type PartitionWide<
    T extends readonly string[],
    TNarrow extends readonly string[] = [],
    TWide extends readonly string[] = []
> = T extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
    ? IsWideString<Head> extends true
        ? PartitionWide<Tail, TNarrow, [...TWide, Head]>
        : PartitionWide<Tail, [...TNarrow, Head], TWide>
    : { narrow: TNarrow; wide: TWide };

/**
 * Extract first elements from array
 */
type ExtractFirst<
    T extends readonly string[],
    TFirst,
    TOut extends readonly string[] = []
> = TFirst extends readonly unknown[]
    ? T extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
        ? Head extends TFirst[number]
            ? ExtractFirst<Tail, TFirst, [...TOut, Head]>
            : ExtractFirst<Tail, TFirst, TOut>
        : TOut
    : T extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
        ? Head extends TFirst
            ? ExtractFirst<Tail, TFirst, [...TOut, Head]>
            : ExtractFirst<Tail, TFirst, TOut>
        : TOut;

/**
 * Remove first elements from array
 */
type RemoveFirst<
    T extends readonly string[],
    TFirst,
    TOut extends readonly string[] = []
> = TFirst extends readonly unknown[]
    ? T extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
        ? Head extends TFirst[number]
            ? RemoveFirst<Tail, TFirst, TOut>
            : RemoveFirst<Tail, TFirst, [...TOut, Head]>
        : TOut
    : T extends readonly [infer Head extends string, ...infer Tail extends readonly string[]]
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
    T extends readonly (string | Container)[],
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
    : T extends readonly string[]
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
    T extends readonly string[],
    O extends StringSortOptions,
    OOrder = O extends { order: infer Ord } ? Ord : undefined,
    TPart = PartitionWide<T>,
    TNatural extends readonly string[] = TPart extends { narrow: infer N; wide: infer W }
        ? N extends readonly string[]
            ? W extends readonly string[]
                ? [...N, ...W]
                : N
            : []
        : [],
    TSorted extends readonly string[] = [IsEqual<OOrder, "Natural">] extends [true]
        ? TNatural
        : _SortStrings<
            T,
            [IsEqual<OOrder, "DESC">] extends [true] ? true : false
        >
> = TSorted;

/**
 * Sorting logic with first elements
 */
type _StringSortWithFirst<
    T extends readonly string[],
    O extends StringSortOptions,
    OOrder = O extends { order: infer Ord } ? Ord : undefined,
    TStart = O["start"] extends readonly unknown[] ? O["start"] : [O["start"]] extends readonly [infer S] ? S : O["start"],
    TStartElements extends readonly string[] = ExtractFirst<T, TStart>,
    TRemainingElements extends readonly string[] = RemoveFirst<T, TStart>,
    TPart = PartitionWide<TRemainingElements>,
    TNatural extends readonly string[] = TPart extends { narrow: infer N; wide: infer W }
        ? N extends readonly string[]
            ? W extends readonly string[]
                ? [...N, ...W]
                : N
            : []
        : [],
    TSorted extends readonly string[] = [IsEqual<OOrder, "Natural">] extends [true]
        ? TNatural
        : _SortStrings<
            TRemainingElements,
            [IsEqual<OOrder, "DESC">] extends [true] ? true : false
        >
> = [...TStartElements, ...TSorted];

/**
 * Sorting logic with end elements
 */
type _StringSortWithEnd<
    T extends readonly string[],
    O extends StringSortOptions,
    OOrder = O extends { order: infer Ord } ? Ord : undefined,
    TEnd = O["end"] extends readonly unknown[] ? O["end"] : [O["end"]] extends readonly [infer E] ? E : O["end"],
    TEndElements extends readonly string[] = ExtractFirst<T, TEnd>,
    TRemainingElements extends readonly string[] = RemoveFirst<T, TEnd>,
    TPart = PartitionWide<TRemainingElements>,
    TNatural extends readonly string[] = TPart extends { narrow: infer N; wide: infer W }
        ? N extends readonly string[]
            ? W extends readonly string[]
                ? [...N, ...W]
                : N
            : []
        : [],
    TSorted extends readonly string[] = [IsEqual<OOrder, "Natural">] extends [true]
        ? TNatural
        : _SortStrings<
            TRemainingElements,
            [IsEqual<OOrder, "DESC">] extends [true] ? true : false
        >
> = [...TSorted, ...TEndElements];

/**
 * Sorting logic with both start and end elements
 */
type _StringSortWithStartAndEnd<
    T extends readonly string[],
    O extends StringSortOptions,
    OOrder = O extends { order: infer Ord } ? Ord : undefined,
    TStart = O["start"] extends readonly unknown[] ? O["start"] : [O["start"]] extends readonly [infer S] ? S : O["start"],
    TEnd = O["end"] extends readonly unknown[] ? O["end"] : [O["end"]] extends readonly [infer E] ? E : O["end"],
    TStartElements extends readonly string[] = ExtractFirst<T, TStart>,
    TEndElements extends readonly string[] = ExtractFirst<RemoveFirst<T, TStart>, TEnd>,
    TRemainingElements extends readonly string[] = RemoveFirst<RemoveFirst<T, TStart>, TEnd>,
    TPart = PartitionWide<TRemainingElements>,
    TNatural extends readonly string[] = TPart extends { narrow: infer N; wide: infer W }
        ? N extends readonly string[]
            ? W extends readonly string[]
                ? [...N, ...W]
                : N
            : []
        : [],
    TSorted extends readonly string[] = [IsEqual<OOrder, "Natural">] extends [true]
        ? TNatural
        : _SortStrings<
            TRemainingElements,
            [IsEqual<OOrder, "DESC">] extends [true] ? true : false
        >
> = [...TStartElements, ...TSorted, ...TEndElements];
