import {
  isArray,
  isNull,
  isObject,
  isString,
  isUndefined
 } from "inferred-types/runtime"
import { Empty } from "inferred-types/types"


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
export const isEmpty = <T>(val: T): val is T & Empty => {
  return isUndefined(val) ||
    isNull(val) ||
    (isString(val) && val.length === 0) ||
    (isObject(val) && Object.keys(val).length === 0) ||
    (isArray(val) && val.length === 0)
}

