import { AnyFunction } from "../../types";

/**
 * **isFunction**(value)
 * 
 * Type guard which checks whether the passed in value is a function.
 * 
 * **Related:** `isFnWithParams`, `ifFunction`
 */
export function isFunction<T extends AnyFunction>(value: unknown): value is T {
  return (typeof value === "function" 
    ? true 
    : false
  );
}
