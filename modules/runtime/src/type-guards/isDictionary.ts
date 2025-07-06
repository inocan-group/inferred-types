import type { Dictionary, Narrowable, ObjectKey } from "inferred-types/types";
import { isMap, isSet, isWeakMap } from "inferred-types/runtime";

/**
 * **isDictionary**(value)
 *
 * Type guard used to detect whether the passed in value is an Object.
 *
 * Note: an _array_ will **not** pass this test (although the _typeof_ operator
 * would have said it was an object)
 *
 * **Related:**
 * - `isNarrowableDictionary()`,
 * - `isObject()`, `isMap()`, `isSet()`, `isWeakMap()`
 */
export function isDictionary(value: unknown): value is Dictionary {
    return typeof value === "object" && value !== null && Array.isArray(value) === false && !isMap(value) && !isSet(value) && !isWeakMap(value);
}

/**
 * **isNarrowableDictionary**(value)
 *
 * Type guard used to detect whether the passed in value is an Object and all of it's
 * values fit into the `Narrowable` type.
 *
 * **Related:**
 * - `isDictionary()`
 * - `isObject()`, `isMap()`, `isSet()`, `isWeakMap()`
 */
export function isNarrowableDictionary(value: unknown): value is Dictionary<ObjectKey, Narrowable> {
    return isDictionary(value) && Object.keys(value).every(key => ["string", "number", "boolean", "symbol", "object", "undefined", "void", "null"].includes(typeof value[key]));
}
