import { isBoolean, isNumber, isString } from "inferred-types/runtime";

/**
 * **isArray**(value)
 *
 * Type guard to detect if the type is an array (readonly or regular)
 */
export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value) === true;
}




/**
 * **isBooleanArray**(value)
 *
 * Type guard to detect if the type is an array of strings (readonly or regular)
 */
export function isBooleanArray(value: unknown): value is boolean[] {
    return isArray(value) && value.every(i => isBoolean(i))
}

