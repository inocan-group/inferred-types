import type { InputTokenLike } from "inferred-types/types";
import {
    isInputToken__Object,
    isInputToken__String
} from "inferred-types/runtime";

/**
 * **isInputToken**`(val)`
 *
 * A type guard which validates that `val` is a valid `InputToken`
 */
export function isInputToken(val: unknown): val is InputTokenLike {
    return isInputToken__String(val) || isInputToken__Object(val);
}
