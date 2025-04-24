import type {
    As,
    AsArray,
    AsNumber,
    Dictionary,
    Flatten,
    IsDefined,
    NumericKeys,
    ObjectKey,
    RemoveNever,
    Filter
} from "inferred-types/types";

type Seperation = {
    /** keys which were seperated by `Separate` utility */
    sep: readonly number[];
    /** remaining keys not impacted by `Separate` utility */
    rest: readonly number[];
};

type FilterIndex<
    TFind,
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
> = RemoveNever<{
    [K in keyof TList]: TList[K][TKey] extends TFind
        ? AsNumber<K>
        : never
}>;

type Ordering<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TType extends readonly unknown[]
> = Flatten<{
    [K in keyof TType]: FilterIndex<TType[K], TList, TKey>
}>

;

type Separate<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TType extends readonly unknown[]
> = {
    sep: Ordering<TList, TKey, TType>;
    rest: RemoveNever<{
        [K in keyof TList]: K extends keyof TList
            ? TList[K]["key"] extends TType[number]
                ? never
                : AsNumber<K>
            : AsNumber<K>
    }>;
};

export type SortByKeyOptions<
    T extends ObjectKey = ObjectKey
> = {
    /** Object Key's  */
    start?: T | readonly T[];
    end?: T | readonly T[];
};

type Sort<
    TList extends readonly Dictionary[],
    TOrder extends readonly number[]
> = {
    [K in keyof TOrder]: TOrder[K] extends keyof TList
        ? TList[TOrder[K]]
        : never
};

type Start<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TSort extends SortByKeyOptions
> = As<
    IsDefined<TSort["start"]> extends true
        ? Separate<TList, TKey, AsArray<TSort["start"]>>
        : {
            sep: [];
            rest: NumericKeys<TList>;
        },
    Seperation
>;

type End<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TSort extends SortByKeyOptions,
> = As<
    IsDefined<TSort["end"]> extends true
        ? Separate<TList, TKey, AsArray<TSort["end"]>>
        : {
            sep: [];
            rest: NumericKeys<TList>;
        },
    Seperation
>;

/**
 * the keys which remain after Start removed those assigned
 * to the start.
 */
type Remaining<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TSort extends SortByKeyOptions,
> = Filter<
    End<TList, TKey, TSort>["rest"],
    Start<TList, TKey, TSort>["rest"][number]
>;

type Order<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TSort extends SortByKeyOptions,
> = [
    ...(Start<TList, TKey, TSort>["sep"]),
    ...(Remaining<TList, TKey, TSort>),
    ...(End<TList, TKey, TSort>["sep"]),
];

/**
 * **SortByKey**`<TList, TKey, TSort>`
 *
 * Sorts a tuple of Dictionaries.
 *
 * - Allows expressing a _type_ or _types_ which either force that record
 * to the **start** or **end** of the array.
 * - `TKey` represents the "key" which will be used for sorting purposes
 * - `TSort` provides `start`, and `end` properties to configure
 * which keys you want to hoist to the beginning or end of the tuple.
 */
export type SortByKey<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TSort extends SortByKeyOptions,
> = Sort<
    TList,
    Order<TList, TKey, TSort>
>;

// DEBUG
// type KV = [
//     { key: "company", value: "[[Anthropic]]" },
//     { key: "kind", value: "[[AI Model]]" },
//     { key: "category", value: "[[LLM]]" },
//     { key: "aliases", value: ["Haiku"] },
//     { key: "desc", value: "The fast and lightweight sibling in the Claude family (Anthropic)" },
//     { key: "subcategory", value: "[[Lightweight Model]]" },
//     { key: "type", value: "[[kind/types/AI.md|AI]]" },
// ]
// type TConfig = {
//     start: ["type", "kind", "category", "subcategory"],
//     end: "desc"
// };

// type TStart = Start<KV, "key", TConfig>;
// type TOrdering = Ordering<KV, "key", TConfig["start"]>
// type TEnd = End<KV, "key", TConfig>;
// type TRemaining = Remaining<KV, "key", TConfig>;
// type TOrder = Order<KV,"key", TConfig>
