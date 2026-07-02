import type { NestingKeyValue } from "inferred-types/types";
import { hasOnlyStringKeys, isDictionary, isString } from "inferred-types/runtime";

function isNestingTupleLike(value: unknown): boolean {
    return Array.isArray(value)
        && (value.length === 2 || value.length === 3)
        && Array.isArray(value[0])
        && value[0].every(isString);
}

function isNestingKeyValueEntry(value: unknown): boolean {
    if (isString(value) && value.length === 1) {
        return true;
    }

    if (Array.isArray(value) && value.length === 2) {
        const [exit, children] = value;
        return isString(exit)
            && exit.length === 1
            && (
                (isDictionary(children) && isNestingKeyValue(children))
                || isNestingTupleLike(children)
            );
    }

    if (isDictionary(value) && "exit" in value) {
        const exit = value.exit;
        const children = "children" in value ? value.children : undefined;

        return isString(exit)
            && exit.length === 1
            && (
                children === undefined
                || (isDictionary(children) && isNestingKeyValue(children))
                || isNestingTupleLike(children)
            );
    }

    return false;
}

/**
 * type-guard which validates that `val` is a `NestingKeyValue`
 */
export function isNestingKeyValue(val: unknown): val is NestingKeyValue {
    return isDictionary(val)
        && hasOnlyStringKeys(val)
        && Object.keys(val).every(i => isString(i) && i.length === 1)
        && Object.values(val).every(isNestingKeyValueEntry);
}
