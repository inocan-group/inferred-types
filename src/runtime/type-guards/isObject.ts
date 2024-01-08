import type { AnyObject  } from "src/types";

/**
 * **isObject**(value)
 * 
 * Type guard used to detect whether the passed in value is an Object.
 * 
 * Note: an _array_ will **not** pass this test (although the _typeof_ operator
 * would have said it was an object)
 */
export function isObject<T>(value: T): value is T & AnyObject  {
  return typeof value === "object" && value !== null && Array.isArray(value) === false;
}
