import type {
    FromKv,
    KeyValue,
} from "inferred-types/types";

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
 * @deprecated prefer use of `FromKv`
 */
export type FromKeyValueTuple<
    T extends readonly KeyValue[],
> = FromKv<T>;
