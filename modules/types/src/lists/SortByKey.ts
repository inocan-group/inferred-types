import {
    As,
    AsArray,
    AsNumber,
    Dictionary,
    IsDefined,
    Narrowable,
    NumericKeys,
    ObjectKey,
    RemoveNever,
    Retain
} from "inferred-types/types";

type Seperation = {
    /** keys which were seperated by `Separate` utility */
    sep: readonly number[];
    /** remaining keys not impacted by `Separate` utility */
    rest: readonly number[];
}

type Separate<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TType
> = {
    sep: RemoveNever<{
        [K in keyof TList]: K extends keyof TList
            ? TList[K][TKey] extends TType
                ? AsNumber<K>
                : never
            : never
    }>,
    rest: RemoveNever<{
        [K in keyof TList]: K extends keyof TList
            ? TList[K]["key"] extends TType
                ? never
                : AsNumber<K>
            : AsNumber<K>
    }>
};

export type SortByKeyOptions<T = Narrowable> = {
    /** Object Key's  */
    start?: T | readonly T[],
    end?: T | readonly T[],
}

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
        ? Separate<TList, TKey, AsArray<TSort["start"]>[number]>
        : {
            sep: [] & readonly number[],
            rest: NumericKeys<TList> & readonly number[]
        },
    Seperation
>

type End<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TSort extends SortByKeyOptions,
> = As<
    IsDefined<TSort["end"]> extends true
    ? Separate<TList, TKey, AsArray<TSort["end"]>[number]>
    : {
        sep: [],
        rest: NumericKeys<TList>
    },
    Seperation
>;

type Reduce<
    T extends readonly number[],
    U extends readonly number[]
> = As<RemoveNever<{
    [K in keyof T]: K extends U[number]
        ? never
        : T[K]
}>, readonly number[]>;

/**
 * the keys which remain after Start removed those assigned
 * to the start.
 */
type Remaining<
    TList extends readonly Dictionary[],
    TKey extends ObjectKey,
    TSort extends SortByKeyOptions,
> = Retain<
    End<TList, TKey, TSort>["rest"],
    Start<TList, TKey, TSort>["rest"]
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
    Order<TList,TKey,TSort>
>;


// DEBUG
// type KV = [
//     {key: "foo", value: 1 },
//     {key: "bar", value: "hi" },
//     {key: "baz", value: 1 },
// ]
// type TSeparate = Separate<KV, "key", "baz">["sep"];
// type TStart = Start<KV, "key", { start: "baz"}>;
// type TEnd = End<KV, "key", { end: "foo"}>;
// type TRemaining = Remaining<KV, "key", {start: "baz", end: "foo"}>;
// type TOrder = Order<KV,"key", {start: "baz", end: "foo"}>
