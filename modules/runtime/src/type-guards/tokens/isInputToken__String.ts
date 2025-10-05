import type { InputTokenSuggestions } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * **isInputToken__String**`(val)`
 *
 * Type guard which validates that `val` is a _string-based_
 * `InputToken`.
 *
 * TODO: this is not ready to be used!
 */
export function isInputToken__String(val: unknown): val is InputTokenSuggestions {
    return isString(val);
}
