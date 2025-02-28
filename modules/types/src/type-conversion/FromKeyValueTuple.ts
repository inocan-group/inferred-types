import type {
    AfterFirst,
    Dictionary,
    EmptyObject,
    ExpandDictionary,
    First,
    KeyValue,
} from "inferred-types/types";

type Process<
    T extends readonly KeyValue[],
    O extends Dictionary = EmptyObject,
> = [] extends T
    ? ExpandDictionary<O>
    : Process<
        AfterFirst<T>,
    O & Record<First<T>["key"], First<T>["value"]>
    >;

/**
 * **FromKeyValueTuple**`<T>`
 *
 * Converts a tuple of KeyValue object into an object.
 *
 * **Example:**
 * ```ts
 * //  { foo: 1 }
 * type T = ToKeyValueTuple<[ {key: "foo", value: 1} ]>
 * ```
 *
 * **Related:** `ObjectToTuple`, `ToKeyValueTuple`, `AsObject`
 */
export type FromKeyValueTuple<
    T extends readonly KeyValue[],
> = Process<T>;
