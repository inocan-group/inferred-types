import { IT_ObjectLiteralDefinition } from "inferred-types/types";
import { isObject, isInputToken__String, isString } from "inferred-types/runtime";

export function isObjectLiteralDefinition(val: unknown): val is IT_ObjectLiteralDefinition {
    return isObject(val) && Object.values(val).every(i => isString(val) && isInputToken__String(val))
}
