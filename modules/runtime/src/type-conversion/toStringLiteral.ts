import { Never, ALPHA_CHARS } from "inferred-types/constants";
import {
    indexOf,
    isArray,
    isFalse,
    isNull,
    isNumber,
    isObject,
    isScalar,
    isString,
    isSymbol,
    isUndefined,
    keysOf,
    stripChars,
    isTrue,
    isInputToken__String
} from "inferred-types/runtime";
import type {
    Narrowable,
    ObjectKey,
    Scalar,
    ToStringLiteral,
    Tuple,
    IsObjectKeyRequiringQuotes,
    IsString,
    ToStringLiteral__Tuple,
    ToJsonOptions,
    ToLiteralOptions
} from "inferred-types/types";
import { log } from "node:console";

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
        ? stripChars(val, ...ALPHA_CHARS) === ""
            ? false
            : true
        : false
    ) as IsString<T> & IsObjectKeyRequiringQuotes<T & string> extends true
? true
: false
}


function property(prop: ObjectKey): string {
    if (isString(prop)) {
        if(isObjectKeyRequiringQuotes(prop)) {
            return `"${prop}"`
        }

        return prop;
    }

    return String(prop);
}

function toStringLiteral__Object<
    T extends Record<ObjectKey, string>
>(obj: T): string {
    const inner: string[] = [];

    for (const k of keysOf(obj)) {
        inner.push(`${property(k)}: ${obj[k]}`)
    }

    return `{ ${inner.join(", ")} }`
}

function mutateObjectKeys<T extends Record<ObjectKey, unknown>>(
    obj: T,
    opt?: ToLiteralOptions
) {
    let result: Record<ObjectKey, string> = {};
    for (const k of Object.keys(obj)) {
        result[k] = toStringLiteral(indexOf(obj,k), opt) as unknown as string;
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
                : Never
}

export function toStringLiteral__Tuple<
    T extends readonly N[],
    N extends Scalar | Record<ObjectKey, V> | Tuple,
    V extends Narrowable
>(
    tup: T,
    opt?: ToLiteralOptions
) {
    return `[ ${tup.map(i => toStringLiteral(i as any, opt) ).join(", ")} ]` as ToStringLiteral__Tuple<T>
}

/**
 * **toStringLiteral**`(value) -> string`
 *
 * Converts any value into a string literal which _represents_ the
 * value.
 *
 * **Related:** `toJson()`
 */
export function toStringLiteral<
    T extends Scalar | Record<ObjectKey, V> | readonly (Scalar | Record<ObjectKey, V>)[],
    V extends Narrowable,
    O extends ToLiteralOptions
>(
    val: T,
    opt: O = {} as O
): ToStringLiteral<T> {
    const o = {
        tokensAllowed: false,
        quote: "\"",
        ...(opt || {})
    } as ToLiteralOptions

    return (
        isArray(val)
            ? toStringLiteral__Tuple(val as any, o)
            : isObject(val)
            ? toStringLiteral__Object(mutateObjectKeys(val, o))
            : isTrue(val)
            ? "true"
            : isFalse(val)
            ? "false"
            : isScalar(val)
            ? scalarValue(val, o)
            : Never
    ) as unknown as ToStringLiteral<T>
}

