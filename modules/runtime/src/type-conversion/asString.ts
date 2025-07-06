import type { AsString } from "inferred-types/types";
import {
    isArray,
    isBoolean,
    isDictionary,
    isNumber,
    isString,
    keysOf,
} from "inferred-types/runtime";

/**
 * **asString**`(value)
 *
 * Attempts to convert the value passed in into a string
 * using the same methods available to the type utility
 * `AsString<T>`.
 *
 * If unable to convert to a string then it will provide
 * the runtime value of `String(value)` but the type system
 * will be set to `never`.
 *
 * - if an array is passed in then it will be joined
 * together -- no delimiter characters -- into a string
 * - if a tuple of `SimpleToken[]` is discovered it will
 * set the runtime type to a token of `<<string::...>>` while the
 * type of the string will be
 */
export function asString<T>(value: T): AsString<T> {
    return (
        isString(value)
            ? value
            : isNumber(value)
                ? `${value}`
                : isBoolean(value)
                    ? `${value}`
                    : isDictionary(value)
                        ? `{ ... ${keysOf(value)} ... }`
                        : isArray(value)
                            ? `any[]`
                            : String(value)
    ) as unknown as AsString<T>;
}
