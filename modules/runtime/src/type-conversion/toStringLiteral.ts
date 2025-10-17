import type {
    DefineObject,
    IsObjectKeyRequiringQuotes,
    IsString,
    Narrowable,
    ObjectKey,
    Scalar,
    ToLiteralOptions,
    ToStringLiteral,
    ToStringLiteral__Array,
    Tuple
} from "inferred-types/types";
import { ALPHA_CHARS, Never } from "inferred-types/constants";
import {
    err,
    indexOf,
    isArray,
    isDictionary,
    isError,
    isFalse,
    isInputToken__String,
    isNull,
    isNumber,
    isScalar,
    isString,
    isSymbol,
    isTrue,
    isUndefined,
    keysOf,
    stripChars
} from "inferred-types/runtime";

/**
 * Object keys typically do not need be surrounded by quotations
 * marks at least if they are of the `PascalCase` or `camelCase`
 * variety but if they contain spaces, dashes, or really any character
 * other than alphanumeric characters then they must be quoted.
 */
export function isObjectKeyRequiringQuotes<T extends ObjectKey>(
    val: T
): IsString<T> & IsObjectKeyRequiringQuotes<T & string> extends true ? true : false {
    return (
        isString(val)
            ? stripChars(val, ...ALPHA_CHARS) !== ""
            : false
    ) as IsString<T> & IsObjectKeyRequiringQuotes<T & string> extends true
        ? true
        : false;
}

function property(prop: ObjectKey): string {
    if (isString(prop)) {
        if (isObjectKeyRequiringQuotes(prop)) {
            return `"${prop}"`;
        }

        return prop;
    }

    return String(prop);
}

/**
 * **toStringLiteral__Object**`(obj) -> token`
 *
 * Converts a `DefineObject` shaped type definition into a string based
 * `InputToken` while converting the _type_ to the type which the token
 * represents.
 */
export function toStringLiteral__Object<
    T extends DefineObject
>(obj: T): string {
    const inner: string[] = [];

    for (const k of keysOf(obj)) {
        inner.push(`${property(k as string)}: ${obj[k as string]}`);
    }

    return `{ ${inner.join(", ")} }`;
}

function mutateObjectKeys<T extends Record<ObjectKey, unknown>>(
    obj: T,
    opt?: ToLiteralOptions
) {
    const result: Record<ObjectKey, string> = {};
    for (const k of Object.keys(obj)) {
        const value = toStringLiteral(
            indexOf(obj, k) as any,
            opt
        );

        // If any property value is an error, propagate it with enhanced context
        if (isError(value)) {
            const originalError = value as any;
            // Preserve both type and subType from original error
            const errorType = originalError.subType
                ? `${originalError.type}/${originalError.subType}`
                : originalError.type || "malformed-token";

            return err(
                errorType,
                `Property "${k}" has a malformed token: ${originalError.message || "invalid token"}`,
                {
                    property: k,
                    token: obj,
                    originalError
                }
            ) as any;
        }

        result[k] = value as unknown as string;
    }

    return result;
}

function scalarValue<
    T extends Scalar,
    O extends ToLiteralOptions
>(
    val: T,
    opt: O
) {
    return isString(val)
        ? isTrue(opt.tokensAllowed)
            ? isInputToken__String(val)
                ? val
                : `"${val}"`
            : `"${val}"`
        : isNumber(val)
            ? `${val}`
            : isUndefined(val)
                ? "undefined"
                : isNull(val)
                    ? "null"
                    : isFalse(val)
                        ? "false"
                        : isTrue(val)
                            ? "true"
                            : isSymbol(val)
                                ? String(val)
                                : Never;
}

export function toStringLiteral__Tuple<
    T extends readonly N[],
    N extends Scalar | Record<ObjectKey, V> | Tuple,
    V extends Narrowable
>(
    tup: T,
    opt?: ToLiteralOptions
) {
    return `[ ${tup.map(i => toStringLiteral(i as any, opt)).join(", ")} ]` as ToStringLiteral__Array<T>;
}

/**
 * **toStringLiteral**`(value, [options]) -> string literal representation`
 *
 * Converts any value into a string literal which _represents_ the
 * value.
 *
 * ```ts
 * // '{ foo: 1; bar: "bar" }'
 * const fooBar = toStringLiteral({foo: 1, bar: "bar"});
 * ```
 *
 * - you can adjust what type of quote marks to use by adjusting the _optional_
 * **options** hash
 *
 * **Related:** `toJSON()`
 */
export function toStringLiteral<
    const T extends Scalar | Record<ObjectKey, V> | readonly (Scalar | Record<ObjectKey, V>)[],
    V extends Narrowable,
    O extends ToLiteralOptions
>(
    val: T,
    options: O = {} as O
): ToStringLiteral<T> {
    const o = {
        tokensAllowed: false,
        quote: "\"",
        ...(options || {})
    } as ToLiteralOptions;

    // Check for Error first - errors should be returned as-is, not stringified
    if (isError(val)) {
        return val as any;
    }

    if (isArray(val)) {
        return toStringLiteral__Tuple(val as any, o) as unknown as ToStringLiteral<T>;
    }

    if (isDictionary(val)) {
        const mutated = mutateObjectKeys(val, o);
        // If mutateObjectKeys returned an error, propagate it
        if (isError(mutated)) {
            return mutated as any;
        }
        return toStringLiteral__Object(mutated) as unknown as ToStringLiteral<T>;
    }

    return (
        isTrue(val)
            ? "true"
            : isFalse(val)
                ? "false"
                : isScalar(val)
                    ? scalarValue(val, o)
                    : Never
    ) as unknown as ToStringLiteral<T>;
}
