import { InputTokenLike } from "inferred-types/types";
import { isArray, isInputToken } from "inferred-types/runtime";

/**
 * type guard which validates that `val` is a tuple of `InputTokenLike`
 * tokens.
 */
export function isInputToken__Tuple(
    val: unknown
): val is readonly InputTokenLike[] {
    return isArray(val) && val.every(
        i => isInputToken(i)
    )
}
