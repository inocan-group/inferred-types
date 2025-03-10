import type { IT_ObjectLiteralDefinition } from "inferred-types/types";
import { isInputToken__String, isObject, isString } from "inferred-types/runtime";

export function isObjectLiteralDefinition(val: unknown): val is IT_ObjectLiteralDefinition {
    return isObject(val) && Object.values(val).every(i => isString(i) && isInputToken__String(i));
}
