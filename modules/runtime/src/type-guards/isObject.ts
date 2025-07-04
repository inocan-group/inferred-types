/**
 * **isObject**(value)
 *
 * Type guard used to detect whether the passed in value is an `object`.
 *
 * - this includes matching on array's, Set's, Map's, and WeakMap's
 *
 * **Related:**
 * - `isNarrowableDictionary()`,
 * - `isObject()`, `isMap()`, `isSet()`, `isWeakMap()`
 */
export function isObject(value: unknown): value is object {
    return typeof value === "object" && value !== null ;
}
