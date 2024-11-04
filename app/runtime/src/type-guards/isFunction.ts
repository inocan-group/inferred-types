import {  TypedFunction } from "@inferred-types/types";

/**
 * **isFunction**(value)
 *
 * Type guard which checks whether the passed in value is a function.
 *
 * **Related:** `isFnWithParams`, `ifFunction`
 */
export function isFunction<T>(value: T): value is T & TypedFunction {
  return (typeof value === "function"
    ? true
    : false
  );
}
