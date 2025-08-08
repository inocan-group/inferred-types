import type { As, Dictionary, Mutable, ObjectKey, SortOrder, SortOptions } from "inferred-types/types";

/**
 * default options for sorting
 */
type SortDefaults = As<{
    first: [],
    last: [],
    order: "natural"
}, Required<SortOptions>
>

export type SortByKeyOptions<T extends ObjectKey = ObjectKey> = {
    /** Object Key's that should be pinned to the start of the array  */
    start?: T | readonly T[];
    /** Object keys's that should be pinned to the end of the array */
    end?: T | readonly T[];

    order?: SortOrder;
};



// Helper to convert single value to array
type ToArray<T> = T extends readonly unknown[] ? T : readonly [T];

// Main implementation
export type SortByKey<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TConfig extends SortByKeyOptions
> = TList extends readonly any[]
    ? Mutable<_SortByKey<TList, TKey, TConfig>>
    : TList;

// Internal implementation
type _SortByKey<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TConfig extends SortByKeyOptions
> = _Reorder<
    TList,
    TKey,
    TConfig["start"] extends any ? ToArray<TConfig["start"]> : readonly [],
    TConfig["end"] extends any ? ToArray<TConfig["end"]> : readonly []
>;

// Reorder the tuple based on start/end configuration
type _Reorder<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TStart extends readonly unknown[],
    TEnd extends readonly unknown[]
> = readonly [
    ..._GetStartElements<TList, TKey, TStart>,
    ..._GetMiddleElements<TList, TKey, TStart, TEnd>,
    ..._GetEndElements<TList, TKey, TEnd>
];

// Get elements that match start values
type _GetStartElements<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TStart extends readonly unknown[]
> = TStart extends readonly [infer First, ...infer Rest]
    ? [
        ..._FilterByValue<TList, TKey, First>,
        ..._GetStartElements<TList, TKey, Rest>
    ]
    : [];

// Get elements that match end values
type _GetEndElements<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TEnd extends readonly unknown[]
> = TEnd extends readonly [infer First, ...infer Rest]
    ? [
        ..._FilterByValue<TList, TKey, First>,
        ..._GetEndElements<TList, TKey, Rest>
    ]
    : [];

// Get middle elements (not in start or end)
type _GetMiddleElements<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TStart extends readonly unknown[],
    TEnd extends readonly unknown[]
> = _FilterByValues<TList, TKey, [...TStart, ...TEnd]>;

// Filter elements by value
type _FilterByValue<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TValue
> = TList extends readonly [infer First, ...infer Rest extends Dictionary[]]
    ? First extends Dictionary
        ? TKey extends keyof First
            ? First[TKey] extends TValue
                ? readonly [First, ..._FilterByValue<Rest, TKey, TValue>]
                : _FilterByValue<Rest, TKey, TValue>
            : _FilterByValue<Rest, TKey, TValue>
        : _FilterByValue<Rest, TKey, TValue>
    : [];

// Filter elements by excluding values
type _FilterByValues<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TValues extends readonly unknown[]
> = TList extends readonly [infer First, ...infer Rest extends Dictionary[]]
    ? First extends Dictionary
        ? TKey extends keyof First
            ? First[TKey] extends TValues[number]
                ? _FilterByValues<Rest, TKey, TValues>
                : [First, ..._FilterByValues<Rest, TKey, TValues>]
            : [First, ..._FilterByValues<Rest, TKey, TValues>]
        : [First, ..._FilterByValues<Rest, TKey, TValues>]
    : [];
