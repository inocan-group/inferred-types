import { isObject } from "inferred-types/runtime";

/**
 * Type guard which checks if the value passed in is an object which _has_ non-string
 * keys.
 */
export function hasNonStringKeys(val: unknown) {
    return isObject(val) && Object.getOwnPropertySymbols(val).length > 0;
}
