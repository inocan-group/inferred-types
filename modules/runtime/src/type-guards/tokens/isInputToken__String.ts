import { asType, isNotError, isString } from "inferred-types/runtime";
import { InputTokenLike } from "inferred-types/types";


/**
 * Type guard which validates that `val` is a string-based
 * input token.
 */
export function isInputToken__String(val: unknown): val is InputTokenLike & string {
    return isString(val) && isNotError(asType(val));
}
