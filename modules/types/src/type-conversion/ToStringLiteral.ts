import type {
    AfterFirst,
    AlphaNumericChar,
    As,
    Chars,
    Dictionary,
    Equals,
    Extends,
    First,
    If,
    IsBoolean,
    IsFalse,
    IsNull,
    IsNumber,
    IsString,
    IsSymbol,
    IsTrue,
    IsUndefined,
    IsUnion,
    IsWideScalar,
    Join,
    Or,
    QuoteCharacter,
    SafeEncode,
    Scalar,
    StringKeys,
    TupleMeta,
    TypeOfArray,
    UnionToTuple
} from "inferred-types/types";

export type ToLiteralOptions = {
    quote?: QuoteCharacter;
    encode?: boolean;
    /**
     * by default all scalar values are taken to be _what they are_
     * but if this flag is set to `true` then string literals will
     * be evaluated as being an `InputToken`.
     */
    tokensAllowed?: boolean;
};

type Enc<
    T extends string,
    TOpt extends { quote: QuoteCharacter; encode: boolean }
> = TOpt["encode"] extends true
    ? SafeEncode<T>
    : T;

type InnerArray<
    T extends readonly any[],
    O extends { quote: QuoteCharacter; encode: boolean } = { quote: "\""; encode: false }
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
                ? ToStringLiteral__Tuple<T[K], O>
                : T[K] extends Dictionary
                    ? `{ ${InnerObject<T[K], StringKeys<T[K]>, O>} }`
                    : never
}, readonly string[]>;

type Wrap<
    T extends string
> = `(${T})[]`;

type AsUnionArrayString<
    T extends readonly unknown[],
    O extends readonly string[] = []
> = [] extends T
    ? Wrap<Join<O, " | ">>
    : AsUnionArrayString<
        AfterFirst<T>,
        ToStringLiteral<First<T>> extends infer Type extends string
            ? [...O, Type]
            : O
    >;

/**
 * **ToJsonArray**`<T,[Q]>`
 *
 * Converts an array to a JSON string of the same type.
 *
 * **Related:** `ToJson`, `ToJsonObject`, `ToJsonScalar`
 */
export type ToStringLiteral__Tuple<
    T extends readonly unknown[],
    O extends { quote: QuoteCharacter; encode: boolean } = { quote: "\""; encode: false }
>
= [TupleMeta<T>["isWide"]] extends [true]
    ? [T] extends [readonly (infer Type)[]]
        ? [IsUnion<Type>] extends [true]
            ? [UnionToTuple<Type>] extends [readonly unknown[]]
                ? AsUnionArrayString<UnionToTuple<Type>>
                : never
            : [Type] extends [Scalar]
                ? `${ToStringLiteral__Scalar<Type>}[]`
                : [Type] extends [Dictionary]
                    ? `${ToStringLiteral__Object<Type>}[]`
                    : never
        : never
    : // TUPLE
    [T["length"]] extends [0]
        ? `[]`
        : `[ ${Join<InnerArray<T, O>, ", ">} ]`;

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
    : First<TChars> extends AlphaNumericChar
        ? IsObjectKeyRequiringQuotes<T, AfterFirst<TChars>>
        : true;

/**
 * Adds quotation marks around property names which require it
 */
type Prop<
    TProp extends string,
    TOpt extends { quote: QuoteCharacter; encode: boolean }
> = [IsObjectKeyRequiringQuotes<TProp>] extends [true]
    ? `${TOpt["quote"]}${TProp}${TOpt["quote"]}`
    : TProp;

/**
 * Builds out the key/value pairs in the an object
 * but doesn't both with the curly brackets.
 */
type InnerObject<
    T extends Dictionary,
    K extends readonly (keyof T & string)[],
    O extends { quote: QuoteCharacter; encode: boolean } = { quote: "\""; encode: false },
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
                Equals<T[First<K>], null>,
                Equals<T[First<K>], undefined>,
            ]> extends true
                ? `${Prop<First<K>, O>}: ${As<T[First<K>], boolean | number | null | undefined>}`
                : [T[First<K>]] extends [boolean]
                    ? If<
                        IsTrue<T[First<K>]>,
                `${Prop<First<K>, O>}: true`,
                IsFalse<T[First<K>]> extends true
                    ? `${Prop<First<K>, O>}: false`
                    : `${Prop<First<K>, O>}: boolean`
                    >
                    : T[First<K>] extends string
                        ? `${Prop<First<K>, O>}: ${O["quote"]}${T[First<K>]}${O["quote"]}`
                        : T[First<K>] extends readonly unknown[]
                            ? `${Prop<First<K>, O>}: ${ToStringLiteral__Tuple<T[First<K>]>}`
                            : T[First<K>] extends Dictionary
                                ? `${Prop<First<K>, O>}: ${ToStringLiteral__Object<T[First<K>]>}`
                                : never,
        ]
    >;

/**
 * **ToJsonObject**`<T>`
 *
 * Converts an object type `T` to a JSON string of the same type.
 *
 * **Related:** `ToJson`, `ToJsonArray`, `ToJsonScalar`
 */
export type ToStringLiteral__Object<
    T extends Dictionary,
    O extends { quote: QuoteCharacter; encode: boolean } = { quote: "\""; encode: false }
> = `{ ${InnerObject<T, StringKeys<T>, O>} }`;

/**
 * **ToJsonScalar**`<T>`
 *
 * Converts a scalar value to the JSON string representation.
 *
 * **Related:** `ToJson`, `ToJsonArray`, `ToJsonObject`
 */
export type ToStringLiteral__Scalar<
    T extends Scalar,
    O extends { quote: QuoteCharacter; encode: boolean } = { quote: "\""; encode: false }
> = [T] extends [string]
    ? [string] extends [T]
        ? "string"
        : `${O["quote"]}${Enc<T, O>}${O["quote"]}`
    : [T] extends [boolean]
        ? [T] extends [true]
            ? "true"
            : [T] extends [false]
                ? "false"
                : "boolean"
        : [IsWideScalar<T>] extends [true]
            ? If<
                IsString<T>,
                "string",
                [IsNumber<T>] extends [true]
                    ? "number"
                    : [IsNull<T>] extends [true]
                        ? "null"
                        : [IsBoolean<T>] extends [true]
                            ? "boolean"
                            : [IsSymbol<T>] extends [true]
                                ? "symbol"
                                : never
            >
            : [T] extends [symbol]
                ? "symbol"
                : [T] extends [string | number | boolean]
                    ? `${T}`
                    : never;

export type ToStringLiteral__Union<
    T extends readonly unknown[]
> = Join<{
    [K in keyof T]: ToStringLiteral<T[K]>
}, " | ">;

export type ToStringLiteral__Array<
    TArr extends unknown[],
> = [TypeOfArray<TArr>] extends [Scalar]
    ? `${ToStringLiteral__Scalar<TypeOfArray<TArr>>}[]`
    : "nope";

export type ToJsValueOptions = {
    quote?: QuoteCharacter;
    encode?: boolean;
};

type O<
    T extends ToJsValueOptions
> = {
    quote: T["quote"] extends QuoteCharacter ? T["quote"] : "\"";
    encode: T["encode"] extends boolean ? T["encode"] : false;
};

type _ToStringLiteral<
    T,
    Opt extends ToJsValueOptions = { quote: "\""; encode: false },
> = [IsUndefined<T>] extends [true]
    ? "undefined"
    : [IsNull<T>] extends [true]
        ? "null"

        : [IsUnion<T>] extends [true]
            ? ToStringLiteral__Union<UnionToTuple<T>>
            : [string] extends [T]
                ? "string"
                : [number] extends [T]
                    ? "number"
                    : [boolean] extends [T]
                        ? "boolean"
                        : [T] extends [number]
                            ? `${T}`
                            : [T] extends [string]
                                ? `"${T}"`
                                : [T] extends [true]
                                    ? "true"
                                    : [T] extends [false]
                                        ? "false"
                                        : T extends readonly unknown[]
                                            ? ToStringLiteral__Tuple<T, O<Opt>>
                                            : T extends Record<string, any>
                                                ? ToStringLiteral__Object<T, O<Opt>>
                                                : never;

/**
 * Converts any Typescript variable to a string literal
 * representation of that variable.
 *
 * **Related:** `ToJsonObject`, `ToJsonArray`, `ToJsonScalar`
 */
export type ToStringLiteral<
    T,
    Opt extends ToJsValueOptions = { quote: "\""; encode: false },
> = _ToStringLiteral<T, Opt>;
