import { isObject } from "runtime/type-guards/isObject";

/**
 * type-guard which validates that `val` is an object with **only** strings
 * as a key.
 *
 * **Related:** `hasOnlySymbolKeys()`
 */
export function hasOnlyStringKeys(val: unknown): val is Record<string, unknown> {
    return isObject(val) && Object.getOwnPropertySymbols(val).length === 0;
}
