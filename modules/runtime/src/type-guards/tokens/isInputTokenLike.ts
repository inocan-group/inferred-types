import type { InputTokenLike } from "inferred-types/types";
import {
    isInputToken__Object,
    isInputToken__String,
    isInputToken__Tuple
} from "inferred-types/runtime";

/**
 * **isInputToken**`(val)`
 *
 * A type guard which validates that `val` is a valid `InputToken`
 */
export function isInputTokenLike(val: unknown): val is InputTokenLike {
    return isInputToken__String(val) || isInputToken__Object(val) || isInputToken__Tuple(val);
}
