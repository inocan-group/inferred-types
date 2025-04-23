import type {
    AfterFirst,
    Dictionary,
    EmptyObject,
    Expand,
    First,
    IsWideContainer,
    KeyValue,
    MakeKeysOptional,
    ObjectKey,
} from "inferred-types/types";

type AddRequiredKey<
    TObj extends Dictionary,
    TKey extends ObjectKey,
    TVal
> = TObj & Record<TKey, TVal>;

type AddOptionalKey<
    TObj extends Dictionary,
    TKey extends ObjectKey,
    TVal,
    TKeys extends readonly ObjectKey[] = readonly [TKey]
> = MakeKeysOptional<
    Expand<TObj & Record<TKey, TVal>> extends Dictionary
        ? Expand<TObj & Record<TKey, TVal>>
        : never,
    TKeys
>;

type Process<
    TIn extends readonly KeyValue[],
    TOut extends Dictionary = EmptyObject
> = [] extends TIn
    ? Expand<TOut>
    : Process<
        AfterFirst<TIn>,
        "required" extends keyof First<TIn>
            ? First<TIn>["required"] extends false
                ? AddOptionalKey<TOut, First<TIn>["key"], First<TIn>["value"]>
                : AddRequiredKey<TOut, First<TIn>["key"], First<TIn>["value"]>
            : AddRequiredKey<TOut, First<TIn>["key"], First<TIn>["value"]>
    >;

/**
 * **FromKv**`<T>`
 *
 * Converts a tuple of `KeyValue` objects into a narrowly typed object.
 *
 * ```ts
 * // { foo: 1; bar: "hi" }
 * type FooBar = FromKv<[
 *    { key: "foo", value: 1 },
 *    { key: "bar", value: "hi" }
 * ]>;
 * ```
 *
 * **Related:** `ToKv`, `KeyValue`
 */
export type FromKv<T extends readonly KeyValue[]> = IsWideContainer<T> extends true
    ? Dictionary
    : Process<T>;
