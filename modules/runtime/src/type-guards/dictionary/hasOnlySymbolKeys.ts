import { isObject } from "runtime/type-guards/isObject";

/**
 * type-guard which validates that `val` is an object with **only** symbol
 * as a key.
 *
 * **Related:** `hasOnlySymbolKeys()`, `hasOnlyStringKeys()`
 */
export function hasOnlySymbolKeys(val: unknown): val is Record<symbol, unknown> {
    return isObject(val) && Object.getOwnPropertySymbols(val).length > 0 && Object.keys(val).length == 0;
}
