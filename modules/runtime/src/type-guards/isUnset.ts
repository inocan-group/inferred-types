import type { Unset } from "inferred-types/types";
import { isDictionary } from "inferred-types/runtime";

/**
 * **isUnset**`(val)`
 *
 * Type guard which validates that the value passed in `Unset`.
 *
 * **Related:** `isSet()`
 */
export function isUnset(val: unknown): val is Unset {
    return isDictionary(val) && val.kind === "Unset";
}
