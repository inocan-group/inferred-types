import type {
    As,
    Container,
    Dictionary,
    Err,
    IsAny,
    IsNever,
    IsStringLiteral,
    ObjectKeys,
} from "inferred-types/types";

type Validate<T extends Container> = [IsAny<T>] extends [true]
? Err<`invalid-type/values`, `Values<T> was called where T was the 'any' type`>
: [IsNever<T>] extends [true]
? Err<`invalid-type/values`, `Values<T> was called where T was the 'never' type`>
: T

// Single-pass implementation with bounded recursion to avoid deep instantiation errors
type GetValues<
    TObj extends Dictionary,
    TKeys extends readonly PropertyKey[],
    TAcc extends readonly unknown[] = [],
> = [] extends TKeys
    ? TAcc  // Return what we have so far to avoid deep recursion error
    : TKeys extends readonly [infer First, ...infer Rest]
        ? First extends keyof TObj
            ? Rest extends readonly PropertyKey[]
                ? GetValues<
                    TObj,
                    Rest,
                    [
                        ...TAcc,
                        TObj[First]
                    ]
                >
                : never
            : never
        : TAcc;

/**
 * **Values**`<T>`
 *
 * Produces a tuple of all the _values_ in an object.
 *
 * - you _can_ run it on a tuple too but this is in effect an identity
 * function and will just return the tuple's values/types "as is"
 * - passing in `any` or `never` to this utility will result in an Error
 */
export type Values<
    T extends Container,
> = Validate<T> extends Error
? Validate<T>
: As<
    T extends readonly unknown[]
        ? T
    : T extends Dictionary
        ? T extends Record<infer K, infer V>
            ? IsStringLiteral<K> extends true
                ? GetValues<T, As<ObjectKeys<T>, readonly PropertyKey[]>>
                : V[]  // For wide objects, return array of value type
            : unknown[]
    : unknown[],
    readonly unknown[]
>
