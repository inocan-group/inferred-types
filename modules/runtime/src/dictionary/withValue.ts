import type {
    As,
    Dictionary,
    FromInputToken,
    ExpandDictionary,
    Mutable,
    Narrowable,
    ObjectKey,
    ObjectKeys,
    StringKeys,
    Suggest,
    WithValue,
    ExpandRecursively,
} from "inferred-types/types";
import { doesExtend, every, hasIndexOf, indexOf, isArray, isBoolean, isDictionary, isFalse, isNumber, isObject, isScalar, isString, isTrue, isUndefined, keysOf } from "inferred-types/runtime";
import { isNarrowableArray } from "../type-guards";


const lookup = {
    string: "string" as string,
    "string|undefined": "string|undefined" as unknown as string | undefined,
    number: "number" as unknown as number,
    "number|undefined": "number|undefined" as unknown as number | undefined,
    "string|number": "string|number" as unknown as string | number,
    boolean: "boolean" as unknown as boolean,
    true: "true" as unknown as true,
    false: "false" as unknown as "false",
    object: "object" as unknown as object,
    Object: "object" as unknown as object,
    "Record<ObjectKey,unknown>": "Record<ObjectKey,unknown>" as unknown as Dictionary,
    "Record<ObjectKey,string>": "Record<ObjectKey,string>" as unknown as Record<string, string>,
    "Record<ObjectKey,string|number>": "Record<ObjectKey,string|number>" as unknown as Record<string, string|number>,
    "string[]": "string[]" as unknown as string[],
    "number[]": "number[]" as unknown as number[],
    "boolean[]": "boolean[]" as unknown as boolean[],
} as const;

type Lookup = Mutable<typeof lookup>;

type TypeSuggestion = ObjectKeys<typeof lookup>;


/**
 * validates whether the value _extends_ the baseType
 */
function testExtends<T extends Narrowable, U extends AllowableType>(value: T, baseType: U): boolean {
    if (isString(baseType) && hasIndexOf(keysOf(lookup), baseType)) {
        switch(baseType) {
            case "string":
                return isString(value);
            case "string|undefined":
                return isString(value) || isUndefined(value);
            case "number":
                return isNumber(value);
            case "number|undefined":
                return isNumber(value) || isUndefined(value);
            case "string|number":
                return isNumber(value) || isString(value);
            case "boolean":
                return isBoolean(value);
            case "true":
                return isTrue(value);
            case "false":
                return isFalse(value);
            case "object":
            case "Object":
                return isObject(value);
            case "Record<ObjectKey,unknown>":
                return isDictionary(value);
            case "Record<ObjectKey,string>":
                return isDictionary(value) && Object.values(value).every(i => isString(i));
            case "Record<ObjectKey,string|number>":
                return isDictionary(value) && Object.values(value).every(i => isString(i) || isNumber(i));
            case "string[]":
                return isArray(value) && value.every(i => isString(i));
            case "number[]":
                return isArray(value) && value.every(i => isNumber(i));
            case "boolean[]":
                return isArray(value) && value.every(i => isBoolean(i));
        }
    }

    if (isArray(baseType) && isNarrowableArray(baseType)) {
        if (!isNarrowableArray(value)) {
            return false;
        }
        if (baseType.length !== value.length) {
            return false;
        }
        return value.every((_, i) => testExtends(value[i as number], baseType[i] as AllowableType));
    }

    if (isDictionary(baseType)) {
        if (!isDictionary(value)) {
            return false;
        }
        const baseKeys = Object.keys(baseType);
        const valueKeys = Object.keys(value);

        // Check if value has all the keys from baseType
        for (const key of baseKeys) {
            if (!isUndefined(baseType[key]) && !hasIndexOf(valueKeys, key)) {
                return false;
            }
            // Recursively test each property
            if (!testExtends((value as any)[key], baseType[key] as AllowableType)) {
                return false;
            }
        }
        return true;
    }

    // For scalar values, check direct equality
    if (isScalar(baseType) && isScalar(value)) {
        return value === baseType;
    }

    return false;
}

type ConvertObjType<
    TObj extends Record<string, unknown>,
    TKeys extends readonly (PropertyKey & keyof TObj)[] = As<StringKeys<TObj>, readonly (PropertyKey & keyof TObj)[]>,
    TResult extends Record<string, unknown> = {}
> = TKeys extends [
        infer Head extends PropertyKey & keyof TObj,
        ...infer Rest extends readonly (PropertyKey & keyof TObj)[]
    ]
    ? TObj[Head] extends AllowableType
        ? ConvertObjType<
            TObj,
            Rest,
            TResult & Record<Head, ConvertType<TObj[Head]>>
        >
        : never
: ExpandRecursively<TResult>;

type AllowableType =
    | number | boolean | string
    | readonly (number | boolean | Suggest<TypeSuggestion>)[]
    | Record<string,string|number|boolean>;

type ConvertType<T extends AllowableType> =
T extends string
    ? T extends keyof Lookup
        ? Lookup[T]
        : T
: T extends number
    ? T
: T extends boolean
    ? T
: T extends readonly (number | boolean | Suggest<TypeSuggestion>)[]
    ? {
        [K in keyof T]: T[K] extends AllowableType
            ? ConvertType<T[K]>
            : never
    }
: T extends Record<string,string|number|boolean>
    ? ConvertObjType<T>
: never;


/**
 * **withValue**`(withValue) -> (obj) -> (filtered obj)
 *
 * A _higher-order_ runtime utility which allow you to:
 *
 * - the first call specifies a **type** which you will use for filtering
 * - the second call receives an object and those key/values whose values
 * _extend_ the type defined are kept, the rest are removed.
 *
 * **Note:** for now you can only specify simple types. Soon a full parser will be made available.
 *
 * ```ts
 * // { bar: "hi" }
 * const obj = withValue("string")({ foo: 1, bar: "hi", baz: 2 });
 * ```
 */
export function withValue<
    TWith extends AllowableType
>(
    withValue: TWith,
) {
    return <const TObj extends Record<string,N>, N extends Narrowable>(obj: TObj) => {
        const result: Record<string,unknown> = {};
        for (const k in keysOf(obj)) {
            if (testExtends(obj[k], withValue)) {
                result[k] = obj[k];
            }
        }

        return result as Mutable<WithValue<TObj, ConvertType<TWith>>>
    }
}
