import type {
    AnyObject,
    ObjectToTuple,
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
 * **Related:** `ObjectToTuple`, `FromKeyValueTuple`
 */
export type ToKeyValueTuple<
    TObj extends AnyObject,
> = ObjectToTuple<TObj, false>;
