import type { Dictionary, Narrowable, ObjectKey } from "inferred-types/types";
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
    TObj extends Dictionary<string | symbol, N>,
    N extends Narrowable,
    TKeys extends readonly (ObjectKey & keyof TObj)[],
>(dict: TObj, ...keys: TKeys) {
    return retainKeys(dict, ...keys);
}
