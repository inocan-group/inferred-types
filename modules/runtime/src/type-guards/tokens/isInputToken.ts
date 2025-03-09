import type { InputToken } from "inferred-types/types";
import {
    asType,
    isNotError,
    isObjectLiteralDefinition,
    isString
} from "inferred-types/runtime";

export function isInputToken__String(val: unknown) {
    return isString(val) && isNotError(asType(val));
}

/**
 * **isInputToken**`(val)`
 *
 * A type guard which validates that `val` is a valid `InputToken`
 */
export function isInputToken(val: unknown): val is InputToken {
    return isInputToken__String(val) || isObjectLiteralDefinition(val);
}
