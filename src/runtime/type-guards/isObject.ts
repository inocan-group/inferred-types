import type {  AnyObject  } from "src/types";

/**
 * **isObject**(value)
 * 
 * Type guard used to detect whether the passed in value is an Object.
 */
export function isObject<T extends AnyObject>(value: unknown): value is T  {
  return typeof value === "object" && value !== null && Array.isArray(value) === false;
}
