import type { TypedFunction } from "inferred-types/types";

/**
 * **isFunction**(value)
 *
 * Type guard which checks whether the passed in value is a function.
 *
 * **Related:** `isFnWithParams`, `ifFunction`
 */
export function isFunction(value: unknown): value is TypedFunction {
  return typeof value === "function";
}

