import type { As, Dictionary, InputToken, ToStringLiteral__Array, ToStringLiteral__Object, Trim } from "inferred-types/types";
import { Never } from "inferred-types/constants";

import {
    isArray,
    isDictionary,
    isString,
    toStringLiteral__Object,
    toStringLiteral__Tuple
} from "inferred-types/runtime";

/**
 * **asInputToken**`(token) -> string`
 *
 * Takes an input token(string or otherwise) and returns it as a string token.
 *
 * - the "type" is just the string literal token value
 * - if you'd prefer the _type_ to be transformed to what the type the token is
 * referencing then use `fromInputToken()` instead.
 */
export function asInputToken<const T extends InputToken>(token: T) {
    return (
        isString(token)
            ? token.trim() as Trim<As<T, string>>
            : isDictionary(token)
                ? toStringLiteral__Object(token)
                : isArray(token)
                    ? toStringLiteral__Tuple(token as any[])
                    : Never
    ) as T extends string
        ? Trim<T>
        : T extends Dictionary
            ? ToStringLiteral__Object<T>
            : T extends any[]
                ? ToStringLiteral__Array<T>
                : never;
}
