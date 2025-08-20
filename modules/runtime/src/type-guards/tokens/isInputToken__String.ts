import type { InputTokenSuggestions } from "inferred-types/types";
import { asType, isNotError, isString } from "inferred-types/runtime";

/**
 * **isInputToken__String**`(val)`
 *
 * Type guard which validates that `val` is a _string-based_
 * `InputToken`.
 */
export function isInputToken__String(val: unknown): val is InputTokenSuggestions {
    return isString(val) && isNotError(asType(val));
}
