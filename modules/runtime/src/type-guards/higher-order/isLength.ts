import {
    isArray,
    isEqual,
    isObject,
    isString,
    keysOf,
} from "inferred-types/runtime";

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
    TLen extends number,
>(value: TValue, len: TLen) {
    return isArray(value)
        ? !!isEqual((value as unknown[]).length)(len)
        : isString(value)
            ? !!isEqual(value.length)(len)
            : isObject(value)
                ? !!isEqual(keysOf(value))(len)
                : false;
}
