import { InputToken } from "inferred-types/types";
import {
    fromInputToken,
    isObjectLiteralDefinition,
    isString,
    isNotError
} from "inferred-types/runtime";



export function isInputToken__String(val: unknown) {
    return isString(val) && isNotError(fromInputToken(val));
}

/**
 * **isInputToken**`(val)`
 *
 * A type guard which validates that `val` is a valid `InputToken`
 */
export function isInputToken(val: unknown): val is InputToken {
    return isInputToken__String(val) || isObjectLiteralDefinition(val);
}
