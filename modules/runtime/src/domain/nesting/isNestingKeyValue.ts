import { NestingKeyValue } from "inferred-types/types";
import { hasOnlyStringKeys, isObject, hasOnlyStringValues, isString } from "inferred-types/runtime";

/**
 * type-guard which validates that `val` is a `NestingKeyValue`
 */
export function isNestingKeyValue(val: unknown): val is NestingKeyValue {
    return isObject(val)
        && hasOnlyStringKeys(val)
        && hasOnlyStringValues(val)
        && Object.keys(val).every(i => isString(i) && i.length === 1)
}

