import type {
    InputToken__Object
} from "inferred-types/types";
import {
    isInputTokenLike,
    isDictionary,
    isString
} from "inferred-types/runtime";

/**
 * a type guard which validates that `val` is of type `IT_ObjectLiteralDefinition`
 */
export function isInputToken__Object(
    val: unknown
): val is InputToken__Object {
    return isDictionary(val) && Object.values(val).every(
        i => isString(i) && isInputTokenLike(i)
    );
}
