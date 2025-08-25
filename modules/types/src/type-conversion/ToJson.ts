import type {
    AfterFirst,
    As,
    Dictionary,
    Equals,
    Extends,
    First,
    Join,
    MergeObjects,
    Or,
    QuoteCharacter,
    SafeEncode,
    Scalar,
    StringKeys,
    ToStringArray,
    Tuple,
} from "inferred-types/types";

type Enc<
    T extends string,
    TOpt extends Required<ToJsonOptions>
> = TOpt["encode"] extends true
    ? SafeEncode<T>
    : T;

type AsJsonArray<T extends Tuple> = Join<
    [
        "[ ",
        ...ToStringArray<T>,
        " ]",
    ]
>;

/**
 * **ToJsonValue**`<T>`
 *
 * Converts the value in `T` to a form appropriate for a
 * JSON value.
 *
 * Note: all outputs are a _string_ but:
 *
 * - string are placed in double quotes
 * - tuples are processed recursively
 */
export type ToJsonValue<
    T,
    Q extends QuoteCharacter = "\"",
> = T extends string
    ? `${Q}${T}${Q}`
    : T extends number
        ? `${T}`
        : T extends boolean
            ? `${T}`
            : T extends undefined
                ? "undefined"
                : T extends null
                    ? "null"
                    : T extends readonly unknown[]
                        ? AsJsonArray<
                            As<{ [K in keyof T]: ToJsonValue<T[K]> }, string>
                        >
                        : never;

type InnerArray<
    T extends readonly unknown[],
    O extends Required<ToJsonOptions>
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
                ? ToJsonArray<T[K], O>
                : T[K] extends Dictionary
                    ? `{ ${InnerObject<T[K], StringKeys<T[K]>, O>} }`
                    : never
}, readonly string[]>;

/**
 * **ToJsonArray**`<T,[Q]>`
 *
 * Converts an array to a JSON string of the same type.
 *
 * **Related:** `ToJson`, `ToJsonObject`, `ToJsonScalar`
 */
export type ToJsonArray<
    T extends readonly unknown[],
    TOpt extends ToJsonOptions = { quote: "\""; encode: false }
> = InnerArray<T, O<TOpt>> extends readonly string[]
    ? Join<InnerArray<T, O<TOpt>>, ", "> extends infer Inner extends string
        ? `[ ${Inner} ]`
        : never
    : never;

type InnerObject<
    T extends Dictionary,
    K extends readonly (keyof T & string)[],
    O extends Required<ToJsonOptions> = { quote: "\""; encode: false },
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
                ? `${O["quote"]}${First<K>}${O["quote"]}: ${As<T[First<K>], boolean | number | null | undefined>}`
                : T[First<K>] extends string
                    ? `${O["quote"]}${First<K>}${O["quote"]}: ${O["quote"]}${T[First<K>]}${O["quote"]}`
                    : T[First<K>] extends readonly unknown[]
                        ? `${O["quote"]}${First<K>}${O["quote"]}: ${ToJsonArray<T[First<K>], O>}`
                        : T[First<K>] extends Dictionary
                            ? `${O["quote"]}${First<K>}${O["quote"]}: ${ToJsonObject<T[First<K>]>}`
                            : never,
        ]
    >
    ;

/**
 * **ToJsonObject**`<T>`
 *
 * Converts an object type `T` to a JSON string of the same type.
 *
 * **Related:** `ToJson`, `ToJsonArray`, `ToJsonScalar`
 */
export type ToJsonObject<
    T extends Dictionary,
    O extends Required<ToJsonOptions> = { quote: "\""; encode: false }
> = `{ ${InnerObject<T, StringKeys<T>, O>} }`;

/**
 * **ToJsonScalar**`<T>`
 *
 * Converts a scalar value to the JSON string representation.
 *
 * **Related:** `ToJson`, `ToJsonArray`, `ToJsonObject`
 */
export type ToJsonScalar<
    T extends Exclude<Scalar, symbol>,
    O extends Required<ToJsonOptions> = { quote: "\""; encode: false }
> = T extends string
    ? `${O["quote"]}${Enc<T, O>}${O["quote"]}`
    : `${T}`;

export type ToJsonOptions = {
    quote?: QuoteCharacter;
    encode?: boolean;
};

/**
 * Merges user options with defaults to create `Required<ToJsonOptions>`
 */
type O<
    T extends ToJsonOptions
> = As<MergeObjects<{ quote: "\""; encode: false }, T>, Required<ToJsonOptions>>;
/**
 * Converts an object, array or scalar value to a
 * strongly typed JSON string.
 *
 * **Related:**
 * - `ToJsonObject`, `ToJsonArray`, `ToJsonScalar`
 * - `ToStringLiteral`
 */
export type ToJson<
    T extends Exclude<Scalar, symbol> | Dictionary | Tuple,
    Opt extends ToJsonOptions = { quote: "\""; encode: false },
> = T extends Exclude<Scalar, symbol>
    ? ToJsonScalar<T, As<O<Opt>, Required<ToJsonOptions>>>
    : T extends Dictionary
        ? ToJsonObject<T, As<O<Opt>, Required<ToJsonOptions>>>
        : T extends Tuple
            ? ToJsonArray<T, As<O<Opt>, Required<ToJsonOptions>>>
            : never;
