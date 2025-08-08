import type {
    Dictionary,
    EmptyObject,
    ExpandRecursively,
    IsWideContainer,
    KeyValue,
    OptRecord,
} from "inferred-types/types";


type Intersect<
    T extends readonly Dictionary[],
    R extends Dictionary = EmptyObject
> = T extends [infer Head extends Dictionary, ...infer Rest extends Dictionary[]]
? Intersect<
    Rest,
    R & Head
>
: R;


type Convert<
    T extends readonly KeyValue[],
    KV extends readonly Dictionary[] = []
> = T extends [infer Head extends KeyValue, ...infer Rest extends KeyValue[]]
? Head["required"] extends true
    ? Convert<
        Rest,
        [
            ...KV,
            Record<Head["key"],Head["value"]>
        ]
    >

    : Convert<
        Rest,
        [
            ...KV,
            OptRecord<Head["key"],Head["value"]>
        ]
    >
: ExpandRecursively<
    Intersect<KV>
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
    : Convert<T>;
