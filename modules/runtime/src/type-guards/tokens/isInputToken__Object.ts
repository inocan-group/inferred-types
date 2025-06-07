import type {
    InputToken__Object
} from "inferred-types/types";
import {
    isInputToken,
    isObject,
    isString
} from "inferred-types/runtime";

/**
 * a type guard which validates that `val` is of type `IT_ObjectLiteralDefinition`
 */
export function isInputToken__Object(
    val: unknown
): val is InputToken__Object {
    return isObject(val) && Object.values(val).every(
        i => isString(i) && isInputToken(i)
    );
}
