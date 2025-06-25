import { ObjectKey } from "inferred-types/types";
import { isObject } from "runtime/type-guards/isObject";

/**
 * type-guard which validates that `val` is an object with at least one symbol
 * as a key.
 *
 * **Related:** `hasOnlySymbolKeys()`, `hasOnlyStringKeys()`
 */
export function hasSymbolKeys(val: unknown): val is Record<ObjectKey, unknown> {
    return isObject(val) && Object.getOwnPropertySymbols(val).length > 0
}
