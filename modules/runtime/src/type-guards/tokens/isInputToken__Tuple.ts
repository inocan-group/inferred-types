import type { InputTokenLike } from "inferred-types/types";
import { isArray, isInputTokenLike } from "inferred-types/runtime";

/**
 * type guard which validates that `val` is a tuple of `InputTokenLike`
 * tokens.
 */
export function isInputToken__Tuple(
    val: unknown
): val is readonly InputTokenLike[] {
    return isArray(val) && val.every(
        i => isInputTokenLike(i)
    );
}
