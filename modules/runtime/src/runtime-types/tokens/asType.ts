import type {
    As,
    Dictionary,
    Err,
    FromInputToken,
    FromInputToken__Object,
    InputTokenLike,
    KeysWithError,
    ToStringLiteral,
} from "inferred-types/types";
import { Never } from "inferred-types/constants";
import {
    defineObject,
    err,
    fromInputToken,
    isArray,
    isDefineObject,
    isError,
    isString,
    keysWithError,
    toStringLiteral__Tuple
} from "inferred-types/runtime";
import { Tuple } from "inferred-types";



type AsType<T extends readonly InputTokenLike[]> = T["length"] extends 0
? Err<
    `invalid-token/structure`,
    `you passed in zero parameters to asType()!`
>
: T extends [infer Only]
    ? Only extends any[]
        ? Err<
            "invalid-token/tuple",
            `You passed in a single token to asType() but it was an array/tuple. If you're trying to define a tuple type then be sure to use a spread notation instead.`,
            { tokens: ToStringLiteral<T> }
        >
    : Only extends Dictionary
        ? KeysWithError<
            As<FromInputToken__Object<Only>, Dictionary>
        > extends []
            ? FromInputToken__Object<Only>
            : Err<`invalid-token/object`, `A 'DefineObject' was malformed and at least one key produced an error!`, {
                keys: KeysWithError<As<FromInputToken__Object<Only>, Dictionary>>,
                tokens: ToStringLiteral<T>
            }>
    : Only extends InputTokenLike
        ? FromInputToken<Only>
        : never
: T extends readonly InputTokenLike[]
        ? {
            [K in keyof T]: FromInputToken<T[K]>
        }
        : never;

/**
 * Receives an `InputTokenLike` token and converts it to the
 * _type_ this token represents while ensuring that the runtime type
 * is the string representation of the token.
 *
 * **Related:** `fromInputToken()`
 */
export function asType<
    T extends readonly InputTokenLike[]
>(...token: T) {
    if(token.length === 0) {
        return err(
            `invalid-token/structure`,
            `you passed in zero parameters to asType()!`
        ) as unknown as AsType<T>;
    }
    const first = token[0];
    return (
        token.length === 1
            ? isDefineObject(first)
                ? isError(defineObject(first))
                    ? defineObject(first)
                    : keysWithError(defineObject(first)).length > 0
                        ? err(`invalid-token/object`, `Some of the keys in a DefineObject structure were invalid and caused an error`, { keys: keysWithError(defineObject(first))})
                        : defineObject(first)
                : isString(first)
                    ? first.trim()
                    : isArray(first)
                        ? err(
                            `invalid-token/tuple`,
                            `You passed in a single token to asType() but it was an array/tuple. If you're trying to define a tuple type then be sure to use a spread notation instead.`,
                            { tokens: toStringLiteral__Tuple(token) }
                        )
            : token.length > 1
                ? token.map(i => isString(i) ? i : fromInputToken(i))
                : Never
            : Never
    ) as unknown as AsType<T>;
}
