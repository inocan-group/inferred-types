import type { Unset } from "inferred-types/types";
import { isDictionary } from "inferred-types/runtime";

/**
 * **isSet**`(val)`
 *
 * Type guard which validates that the value passed in is **not** `Unset`.
 *
 * **Related:** `isUnset()`
 */
export function isNotUnset<T>(val: T): val is Exclude<T, Unset> {
    return isDictionary(val)
        ? val.kind !== "Unset"
        : true;
}
