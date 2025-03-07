import type {
    AfterFirst,
    As,
    Dictionary,
    Equals,
    Extends,
    First,
    IsBooleanLiteral,
    IsNumericLiteral,
    IsObjectLiteral,
    IsStringLiteral,
    IsUnion,
    IsWideContainer,
    Join,
    Or,
    StringKeys,
    ToJsonOptions,
    UnionToTuple,
} from "inferred-types/types";

type UnionToString<
    TEl extends readonly unknown[],
    O extends Required<ToJsonOptions> = { quote: "'", encode: false },
    TOut extends string = ""
> = [] extends TEl
? TOut
: UnionToString<
    AfterFirst<TEl>,
    O,
    ToString<First<TEl>> extends string
    ? TOut extends ""
        ? ToString<First<TEl>>
        : ` | ${ToString<First<TEl>>}`
    : never
>
;


type _ArrayToString<
    T extends readonly unknown[],
    O extends Required<ToJsonOptions> = { quote: "'", encode: false },
    TOut extends string = "[ "
> = [] extends T
? `${TOut} ]`
: _ArrayToString<
AfterFirst<T>,
O,
ToString<First<T>> extends string
    ? TOut extends "[ "
        ? `[ ${ToString<First<T>>}`
        : `${TOut}, ${ToString<First<T>>}`
    : never
>

export type ArrayToString<
    T extends readonly unknown[],
    O extends Required<ToJsonOptions> = { quote: "'", encode: false },
    TOut extends string = "[ "
> = IsWideContainer<T> extends true
? T extends (infer Kind)[]
    ? `${ToString<Kind>}[]`
    : `unknown[]`
: _ArrayToString<T,O>;

;

type InnerObject<
    T extends Dictionary,
    K extends readonly (keyof T & string)[],
    O extends Required<ToJsonOptions> = { quote: "'", encode: false },
    R extends readonly string[] = [],
> = [] extends K
    ? Join<R, ", ">
    : InnerObject<
        T,
        AfterFirst<K>,
        O,
        [
            ...R,
            Or<[
                Extends<T[First<K>], number>,
                Extends<T[First<K>], boolean>,
                Equals<T[First<K>], null>,
                Equals<T[First<K>], undefined>,
            ]> extends true
                ? `${First<K>}: ${As<T[First<K>], boolean | number | null | undefined>}`
                : T[First<K>] extends string
                    ? `${First<K>}: ${O["quote"]}${T[First<K>]}${O["quote"]}`
                    : T[First<K>] extends readonly unknown[]
                        ? `${First<K>}: ${ArrayToString<T[First<K>], O>}`
                        : T[First<K>] extends Dictionary
                            ? `${First<K>}: ${ObjectToString<T[First<K>]>}`
                            : never,
        ]
    >
;


export type ObjectToString<
    T extends Dictionary,
    O extends Required<ToJsonOptions> = { quote: "'", encode: false }
> = IsObjectLiteral<T> extends true
    ? `{ ${InnerObject<T, StringKeys<T>, O>} }`
    : T extends Record<string, infer V>
        ? `Record<string, ${ToString<V>}>`
        : "object"

export type MapToString<
    T extends Map<any,any>,
    O extends Required<ToJsonOptions> = { quote: "'", encode: false }
> = T extends Map<infer K, infer V>
? `Map<${ToString<K>}, ${ToString<V>}>`
: `Map<any,any>`

export type SetToString<
    T extends Set<any>,
    O extends Required<ToJsonOptions> = { quote: "'", encode: false }
> = T extends Set<infer V>
? `Set<${ToString<V>}>`
: `Set<any>`


export type WeakMapToString<
    T extends WeakMap<any,any>,
    O extends Required<ToJsonOptions> = { quote: "'", encode: false }
> = T extends WeakMap<infer K, infer V>
? `WeakMap<${ToString<K>}, ${ToString<V>}}`
: `WeakMap<any,any>`;

/**
 * **ToString**
 *
 * Converts _any_ type into a string representation of that type.
 *
 * **Related:** `AsString`, `ToJson`
 */
export type ToString<
    T,
    O extends Required<ToJsonOptions> = { quote: "'", encode: false }
> = [T] extends [readonly unknown[]]
    ? ArrayToString<T>
    : [T] extends [string]
    ? [IsStringLiteral<T>] extends [true] ? `${O["quote"]}${T}${O["quote"]}` : "string"
    : [T] extends [number]
    ? [IsNumericLiteral<T>] extends [true] ? `${T}` : "number"
    : [T] extends [boolean]
    ? [IsBooleanLiteral<T>] extends [true] ? `${T}` : "boolean"
    : [T] extends [null]
    ? `null`
    : [T] extends [undefined]
    ? `undefined`
    : [T] extends [Set<any>]
    ? SetToString<T>
    : [T] extends [Map<any,any>]
    ? MapToString<T>
    : [T] extends [WeakMap<any,any>]
    ? WeakMapToString<T>
    : [T] extends [Dictionary]
    ? ObjectToString<T>
    : never;

