import { AnyFunction } from "../../types/base";

/**
 * **isFunction**(value)
 * 
 * Type guard which checks whether the passed in value is a function.
 * 
 * **Related:** `isFnWithParams`, `ifFunction`
 */
export function isFunction<T>(value: T): value is T & AnyFunction {
  return (typeof value === "function" 
    ? true 
    : false
  );
}
