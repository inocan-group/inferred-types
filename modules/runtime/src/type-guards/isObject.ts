import type { Dictionary, Narrowable, ObjectKey } from "inferred-types/types";

/**
 * **isObject**(value)
 *
 * Type guard used to detect whether the passed in value is an Object.
 *
 * Note: an _array_ will **not** pass this test (although the _typeof_ operator
 * would have said it was an object)
 *
 * **Related:** `isNarrowableObject()`
 */
export function isObject(value: unknown): value is Dictionary {
  return typeof value === "object" && value !== null && Array.isArray(value) === false;
}

/**
 * **isObject**(value)
 *
 * Type guard used to detect whether the passed in value is an Object and all of it's
 * values fit into the `Narrowable` type.
 *
 * **Related:** `isObject()`
 */
export function isNarrowableObject(value: unknown): value is Dictionary<ObjectKey, Narrowable> {
  return isObject(value) && Object.keys(value).every(key => ["string", "number", "boolean", "symbol", "object", "undefined", "void", "null"].includes(typeof value[key]));
}
