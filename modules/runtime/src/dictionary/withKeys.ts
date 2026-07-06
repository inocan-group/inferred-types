import type { Dictionary, Err, HasUnionType, Narrowable, NarrowObject, ObjectKey, WithKeys } from "inferred-types/types";
import { retainKeys } from "inferred-types/runtime";

/**
 * **withKeys**(obj,keys)
 *
 * Reduces the key/value pairs in an object to those keys
 * explicitly stated.
 *
 * - note: this function is an alias for `retain()`
 */
export function withKeys<
    TObj extends Dictionary<string | symbol, N> & NarrowObject<N>,
    N extends Narrowable,
    TKeys extends readonly (ObjectKey & keyof TObj)[],
>(dict: TObj, ...keys: TKeys): HasUnionType<TKeys> extends true
    ? Err<
        "invalid-union",
        "the retain(obj, keys) function was called with keys which included a value which was a union type; this would make the typing inconsistent with the runtime type and should be avoided. Note that at runtime this will not produce an error but rather produce the valid runtime value.",
        { keys: TKeys }
    >
    : WithKeys<TObj, TKeys> {
    return retainKeys(dict, ...keys);
}
