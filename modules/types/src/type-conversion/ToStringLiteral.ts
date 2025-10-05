import type {
    AfterFirst,
    AlphanumericChar,
    As,
    Chars,
    Decrement,
    Dictionary,
    Each,
    Extends,
    First,
    GetRequiredElementCount,
    IsAny,
    IsBoolean,
    IsFalse,
    IsGreaterThan,
    IsNever,
    IsNull,
    IsTrue,
    IsUndefined,
    IsUnion,
    IsUnknown,
    Join,
    ObjectKey,
    ObjectKeys,
    OptionalKeys,
    Or,
    QuoteCharacter,
    SafeEncode,
    Scalar,
    TupleMeta,
    UnionToTuple
} from "inferred-types/types";

/* eslint-disable ts/no-unused-vars, unused-imports/no-unused-vars */

export type ToLiteralOptions = {
    quote?: QuoteCharacter;
    encode?: boolean;
    /**
     * by default all scalar values are taken to be _what they are_
     * but if this flag is set to `true` then string literals will
     * be evaluated as being an `InputToken`.
     */
    tokensAllowed?: boolean;

    /**
     * for containers which support the concept of "optional" keys
     */
    isOptional?: boolean;
};

type Enc<
    T extends string,
    TOpt extends ToLiteralOptions
> = TOpt["encode"] extends true
    ? SafeEncode<T>
    : T;

/**
 * Converts the elements in an array to tokens.
 */
type InnerArray<
    T extends readonly any[],
    O extends ToLiteralOptions = { quote: "\""; encode: false; isOptional: false }
> = As<{
    [K in keyof T]: T[K] extends string
        ? `${O["quote"]}${T[K]}${O["quote"]}`
        : Or<[
            Extends<T[K], number>,
            Extends<T[K], boolean>,
            Extends<T[K], null>,
            Extends<T[K], undefined>,
        ]> extends true
            ? `${As<T[K], number | boolean | null | undefined>}`
            : T[K] extends readonly any[]
                ? ToStringLiteral__Array<T[K], O>
                : T[K] extends Dictionary
                    ? ToStringLiteral__Object<T[K], O>
                    : never
}, readonly string[]>;

type Wrap<
    T extends string
> = `(${T})[]`;

type AsUnionArrayString<
    T extends readonly unknown[],
    O extends readonly string[] = []
> = [] extends T
    ? Wrap<As<Join<O, " | ">, string>>
    : AsUnionArrayString<
        AfterFirst<T>,
        ToStringLiteral<First<T>> extends infer Type extends string
            ? [...O, Type]
            : O
    >;

type Splitter<
    T extends readonly unknown[],
    N extends number,
    R extends readonly unknown[] = [],
    O extends readonly unknown[] = []
> = T extends [ infer Head, ...infer Rest extends readonly unknown[] ]
    ? IsGreaterThan<N, 0> extends true
        ? Splitter<
            Rest,
            Decrement<N>,
            [...R, Head],
            O
        >
        : Splitter<
            Rest,
            Decrement<N>,
            R,
            [...O, Head]
        >
    : [
        R,
        T extends [infer Last]
            ? [...O, Last]
            : O
    ];

type ArrayWithOptionalElements<
    T extends readonly unknown[],
    R extends number = GetRequiredElementCount<T>,
> = Required<T> extends infer Tuple extends readonly unknown[]
    ? Splitter<Tuple, R> extends [ infer Req extends readonly unknown[], infer Opt extends readonly unknown[] ]
        ? InnerArray<Req> extends infer Req extends readonly string[]
            ? InnerArray<Opt, { isOptional: true }> extends infer Opt extends readonly string[]
                ? Join<[
                    ...Req,
                    ...Each<Opt, "append", "?">
                ], ", "> extends infer Inner extends string
                    ? `[ ${Inner} ]`
                    : never
                : never
            : never
        : never
    : never;

/**
 * **ToStringLiteral__Array**`<T,[Q]>`
 *
 * Converts an array to a string literal representing that array.
 *
 * ```ts
 * // "[ 1, 2, 3 ]""
 * type Test = ToStringLiteral__Array<[1,2,3]>;
 * ```
 *
 * **Related:**
 * - `ToStringLiteral`, `ToStringLiteral__Object`
 * - `ToJson`, `ToJsonObject`, `ToJsonScalar`
 */
export type ToStringLiteral__Array<
    T extends readonly unknown[],
    O extends ToLiteralOptions = { quote: "\""; encode: false }
> = [TupleMeta<T>["hasOptionalElements"]] extends [true]
    ? ArrayWithOptionalElements<T>
    : [TupleMeta<T>["isWide"]] extends [true]
        ? [T] extends [readonly (infer Type)[]]
            ? [IsUnion<Type>] extends [true]
                ? [UnionToTuple<Type>] extends [readonly unknown[]]
                    ? AsUnionArrayString<UnionToTuple<Type>>
                    : never
                : [Type] extends [Scalar]
                    ? `${ToStringLiteral__Scalar<Type>}[]`
                    : [Type] extends [Dictionary]
                        ? ToStringLiteral__Object<Type> extends infer Obj extends string
                            ? `${Obj}[]`
                            : never
                        : never
            : never
        : [T["length"]] extends [0]
            ? `[]`
            : InnerArray<T, O> extends (infer Arr extends readonly string[])
                ? Join<Arr, ", "> extends infer Inner extends string
                    ? `[ ${Inner} ]`
                    : never
                : never;

/**
 * Object keys typically do not need be surrounded by quotations
 * marks at least if they are of the `PascalCase` or `camelCase`
 * variety but if they contain spaces, dashes, or really any character
 * other than alphanumeric characters then they must be quoted.
 */
export type IsObjectKeyRequiringQuotes<
    T extends string,
    TChars extends readonly string[] = Chars<T>
> = [] extends TChars
    ? false
    : First<TChars> extends AlphanumericChar
        ? IsObjectKeyRequiringQuotes<T, AfterFirst<TChars>>
        : true;

/**
 * Adds quotation marks around property names which require it
 */
type Prop<
    TProp extends string,
    TOpt extends ToLiteralOptions
> = [IsObjectKeyRequiringQuotes<TProp>] extends [true]
    ? `${TOpt["quote"]}${TProp}${TOpt["quote"]}`
    : TProp;

type KeyName<
    T extends ObjectKey,
    O extends string | symbol
> = As<
    T extends string
        ? T extends O ? `${T}?` : T
        : T extends O ? "[symbol]?" : "[symbol]",
    string
>;

type Quote<T extends string, O extends ToLiteralOptions> = As<
    O["quote"] extends QuoteCharacter
        ? `${O["quote"]}${Enc<T, O>}${O["quote"]}`
        : `"${Enc<T, O>}"`,
    string
>;

/**
 * Builds out the key/value pairs in the an object
 */
type InnerObject<
    TDict extends Dictionary,
    TOpt extends ToLiteralOptions = { quote: "\""; encode: false },

    TKeys extends readonly (keyof Required<TDict> & ObjectKey)[] = As<ObjectKeys<Required<TDict>>, readonly (keyof Required<TDict> & ObjectKey)[]>,
    TOptKeys extends string | symbol = OptionalKeys<TDict>,
    TReq extends Dictionary = Required<TDict>,
    TResult extends readonly string[] = [],
>
    = TKeys extends [infer K extends ObjectKey & keyof TDict, ...infer Rest extends readonly ObjectKey[]]
        ? TReq[K] extends infer Value
            ? [IsUnion<Value>] extends [true]
                ? InnerObject<
                    TDict,
                    TOpt,
                    Rest,
                    TOptKeys,
                    TReq,
                    ToStringLiteral__Union<UnionToTuple<Value>, TOpt> extends infer Union extends string
                        ? [
                            ...TResult,
                    `${KeyName<K, TOptKeys>}: ${Union}`
                        ]
                        : never
                >
                : Value extends Scalar
                    ? InnerObject<
                        TDict,
                        TOpt,
                        Rest,
                        TOptKeys,
                        TReq,
                        [
                            ...TResult,
                `${KeyName<K, TOptKeys>}: ${ToStringLiteral__Scalar<Value, TOpt>}`
                        ]
                    >
                    : Value extends readonly unknown[]
                        ? InnerObject<
                            TDict,
                            TOpt,
                            Rest,
                            TOptKeys,
                            TReq,
                            [
                                ...TResult,
                `${KeyName<K, TOptKeys>}: ${ToStringLiteral__Array<Value, TOpt>}`
                            ]
                        >

                        : Value extends Dictionary
                            ? InnerObject<
                                TDict,
                                TOpt,
                                Rest,
                                TOptKeys,
                                TReq,
                                [
                                    ...TResult,
                `${KeyName<K, TOptKeys>}: ${ToStringLiteral__Object<Value, TOpt>}`
                                ]
                            >

                            : never
            : never
        : TKeys extends [ infer Last extends keyof Required<TDict> & ObjectKey]
            ? [
                ...TResult,
                ToStringLiteral<Last, TOpt>
            ]

            : TResult;

/**
 * **ToStringLiteral__Object**`<T, [O]>`
 *
 * Converts an object type `T` to a JSON string of the same type.
 *
 * **Related:** `ToJson`, `ToJsonArray`, `ToJsonScalar`
 */
export type ToStringLiteral__Object<
    T extends Dictionary,
    O extends ToLiteralOptions = { quote: "\""; encode: false }
> = InnerObject<T, O> extends infer Inner extends readonly string[]
    ? `{ ${Join<Inner, ", ">} }`
    : never;

/**
 * **ToJsonScalar**`<T>`
 *
 * Converts a scalar value to the JSON string representation.
 *
 * **Related:** `ToJson`, `ToJsonArray`, `ToJsonObject`
 */
export type ToStringLiteral__Scalar<
    T extends Scalar,
    O extends ToLiteralOptions = { quote: "\""; encode: false }
> = [IsAny<T>] extends [true]
    ? `any`
    : [IsNever<T>] extends [true]
        ? `never`
        : [T] extends [string]
            ? [string] extends [T]
                ? `string`
                : `${Quote<T, O>}`
            : [T] extends [number]
                ? [number] extends [T]
                    ? `number`
                    : `${T}`
                : [T] extends [bigint]
                    ? [bigint] extends [T]
                        ? `bigint`
                        : `${T}`
                    : [IsNull<T>] extends [true]
                        ? `null`
                        : [IsUndefined<T>] extends [true]
                            ? `undefined`
                            : [IsUnknown<T>] extends [true]
                                ? `unknown`
                                : [IsTrue<T>] extends [true]
                                    ? `true`
                                    : [IsFalse<T>] extends [true]
                                        ? `false`
                                        : [IsBoolean<T>] extends [true]
                                            ? `boolean`
                                            : [T] extends [void]
                                                ? `void`
                                                : [T] extends [symbol]
                                                    ? `symbol`
                                                    : never;

export type ToStringLiteral__Union<
    T extends readonly unknown[],
    O extends ToLiteralOptions = { quote: "\""; encode: false }
> = Join<{
    [K in keyof T]: ToStringLiteral<T[K], O>
}, " | ">;

type O<
    T extends ToLiteralOptions
> = {
    quote: T["quote"] extends QuoteCharacter ? T["quote"] : "\"";
    encode: T["encode"] extends boolean ? T["encode"] : false;
};

/**
 * Converts any Typescript type into a string literal
 * _representation_ of that type.
 *
 * **Related:**
 * - `ToStringLiteral__Scalar`, `ToStringLiteral__Object`
 * - `ToJsonObject`, `ToJsonArray`, `ToJsonScalar`
 */
export type ToStringLiteral<
    T,
    Opt extends ToLiteralOptions = { quote: "\""; encode: false },
> = [IsAny<T>] extends [true]
    ? "any"
    : [IsNever<T>] extends [true]
        ? "never"
        : [IsUnion<T>] extends [true]
            ? ToStringLiteral__Union<UnionToTuple<T>, Opt>
            : [T] extends [Scalar]
                ? ToStringLiteral__Scalar<T, Opt>
                : [T] extends [readonly unknown[]]
                    ? ToStringLiteral__Array<T, O<Opt>>
                    : [T] extends [Dictionary]
                        ? ToStringLiteral__Object<T, O<Opt>>
                        : never;
