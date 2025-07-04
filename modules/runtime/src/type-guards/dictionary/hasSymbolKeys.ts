import type { ObjectKey } from "inferred-types/types";
import { isDictionary } from "runtime/type-guards/isObject";

/**
 * type-guard which validates that `val` is an object with at least one symbol
 * as a key.
 *
 * **Related:** `hasOnlySymbolKeys()`, `hasOnlyStringKeys()`
 */
export function hasSymbolKeys(val: unknown): val is Record<ObjectKey, unknown> {
    return isDictionary(val) && Object.getOwnPropertySymbols(val).length > 0;
}
