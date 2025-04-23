import type {
    Dictionary,
    ToKv,
} from "inferred-types/types";

/**
 * **ToKeyValueTuple**`<TObj>`
 *
 * Converts an object into a tuple of `KeyValue` objects.
 *
 * **Example:**
 * ```ts
 * // readonly [ {key: "foo", value: 1} ]
 * type T = ToKeyValueTuple<{ foo: 1 }>
 * ```
 *
 * **Related:** `ToKv`, `FromKv`
 *
 * @deprecated prefer use of `ToKv`
 */
export type ToKeyValueTuple<
    TObj extends Dictionary,
> = ToKv<TObj>;
