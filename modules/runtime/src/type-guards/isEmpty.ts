import type { Empty } from "inferred-types/types";
import {
    isArray,
    isNull,
    isObject,
    isString,
    isUndefined,
} from "inferred-types/runtime";

/**
 * **isEmpty**(val)
 *
 * type guard which validates that `val` is an `Empty` value:
 *
 * - `null` or `undefined`
 * - empty string
 * - empty array
 * - empty object
 */
export function isEmpty<T>(val: T): val is T & Empty {
    return isUndefined(val)
        || isNull(val)
        || (isString(val) && val.length === 0)
        || (isObject(val) && Object.keys(val).length === 0)
        || (isArray(val) && val.length === 0);
}

/**
 * **isNotEmpty**(val)
 *
 * type guard which validates that `val` is **not** an `Empty` value:
 *
 * - `null` or `undefined`
 * - empty string
 * - empty array
 * - empty object
 */
export function isNotEmpty<T>(val: T): val is Exclude<T, Empty> {
    return !(
        isUndefined(val)
        || isNull(val)
        || (isString(val) && val.length === 0)
        || (isObject(val) && Object.keys(val).length === 0)
        || (isArray(val) && (
            val?.length === 0 || val?.length === undefined
        ))
    );
}
