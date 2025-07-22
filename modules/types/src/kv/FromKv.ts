import type {
    AfterFirst,
    Dictionary,
    EmptyObject,
    Expand,
    First,
    IsWideContainer,
    KeyValue,
    OptRecord,
} from "inferred-types/types";

type Convert<
    T extends readonly KeyValue[],
    O extends Dictionary = EmptyObject
> = [] extends T
    ? Expand<O>
    : Convert<
        AfterFirst<T>,
        First<T>["required"] extends true

            ? O & Record<
                First<T>["key"],
                First<T>["value"] extends KeyValue[]
                    ? Convert<First<T>["value"]>
                    : First<T>["value"]
            >
            : O & OptRecord<
                First<T>["key"],
                First<T>["value"]
            >
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
