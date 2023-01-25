import { keys } from "runtime/dictionary/keys";
import { isArray } from "../isArray";
import { isObject } from "../isObject";
import { isString } from "../isString";
import { isEqual } from "./isEqual";

/**
 * **ifLength**(len) => (value) => boolean
 * 
 * Higher order type guard which provides a type-aware check on the
 * "length" of some unit:
 * 
 * - **arrays** - the number of elements in the array
 * - **objects** - the number of keys in the object
 * - **string** - the length of the string
 * 
 * All other types return `false`
 */
export function isLength<
  TValue, 
  TLen extends number
>(value: TValue, len: TLen) {
    return isArray(value)
      ? isEqual(value.length)(len) ? true : false
      : isString(value)
        ? isEqual(value.length)(len) ? true : false
        : isObject(value)
          ? isEqual(keys(value))(len) ? true : false
          : false;
  }

