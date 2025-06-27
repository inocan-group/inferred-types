import { isObject, isString } from "inferred-types/runtime";

/**
 * type-guard which validates that `val` is an object with **only** string
 * values.
 *
 * **Related:** `hasOnlyStringKeys()`
 */
export function hasOnlyStringValues(val: unknown): val is Record<string, unknown> {
    return isObject(val) && Object.keys(val).every(
        i => isString(i)
    );
}
