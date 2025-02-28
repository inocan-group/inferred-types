import type { ParameterlessFn } from "inferred-types/types";

/**
 * **isFunction**(value)
 *
 * Type guard which checks whether the passed in value is a function.
 *
 * **Related:** `isFunction`, `isFnWithParams`
 */
export function isFnWithoutParams(value: unknown): value is ParameterlessFn {
    return typeof value === "function" && value.length === 0;
}
