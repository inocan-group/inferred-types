import type { InputTokenLike } from "inferred-types/types";
import { asType, isNotError, isString } from "inferred-types/runtime";

/**
 * Type guard which validates that `val` is a _string-based_
 * input token.
 */
export function isInputToken__String(val: unknown): val is InputTokenLike & string {
    return isString(val) && isNotError(asType(val));
}
