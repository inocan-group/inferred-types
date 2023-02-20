import type { AnyObject  } from "src/types";

/**
 * **isObject**(value)
 * 
 * Type guard used to detect whether the passed in value is an Object.
 */
export function isObject<T>(value: T): value is T & AnyObject  {
  return typeof value === "object" && value !== null && Array.isArray(value) === false;
}
