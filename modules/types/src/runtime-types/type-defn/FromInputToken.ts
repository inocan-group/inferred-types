import type {
    IT_ATOMIC_TOKENS,
    IT_CONTAINER_TOKENS,
    IT_LITERAL_TOKENS
} from "inferred-types/constants";
import type {
    AfterFirst,
    As,
    AsNumber,
    Dictionary,
    Err,
    First,
    GetTypeOf,
    KeyValue,
    MakeKeysOptional,
    ObjectKey,
    OptionalKeys,
    RetainAfter,
    RetainChars,
    RetainUntil,
    StringLiteralTemplate,
    Suggest,
    ToJson,
    ToKv,
    Trim,
    UnionToTuple,
    WhenErr
} from "inferred-types/types";

type IT_AtomicToken = typeof IT_ATOMIC_TOKENS[number];

type LiteralRaw = typeof IT_LITERAL_TOKENS;
/**
 * **IT_LiteralToken**
 *
 * The literal type tokens which can express a type literal or a
 * union of type literals
 */
type IT_LiteralToken = {
    [K in keyof LiteralRaw]: LiteralRaw[K] extends string
        ? StringLiteralTemplate<LiteralRaw[K]>
        : never
}[number];

type ContainerRaw = typeof IT_CONTAINER_TOKENS;
/**
 * **IT_ContainerToken**
 *
 * An internal token which represents a _container type_ of some sort.
 */
export type IT_ContainerToken = {
    [K in keyof ContainerRaw]: ContainerRaw[K] extends string
        ? StringLiteralTemplate<ContainerRaw[K]>
        : never
}[number];

type BaseSuggest =
| `${IT_AtomicToken}`
| `string | undefined`
| `number | undefined`
| `boolean | undefined`
| `string | number`
| `string | boolean`
| `string | undefined`
| `string | number | undefined`;

type LiteralSuggest =
| `String(foo)` | `String(bar)`
| `Number(1)` | `Number(42)`
| `Boolean(true)` | `Boolean(false)`;

export type InputTokenSuggestions = Suggest<
    | BaseSuggest
    | LiteralSuggest
    | `Array<${BaseSuggest}>`
    | `Map<${BaseSuggest}, ${BaseSuggest}>`
    | `WeakMap<Object, ${BaseSuggest}>`
    | `Set<${BaseSuggest}>`
    | `Record<string, ${BaseSuggest}>`
    | `Record<string|symbol, ${BaseSuggest}>`
>;



/**
 * a string literal (aka, `foo`, `bar`, etc.)
 */
export type IT_StringLiteralToken = `String(${string})`;
/**
 * a numeric literal (aka, `1`, `42`, `99`, etc.)
 */
export type IT_NumericLiteralToken = `Number(${number})`;
/**
 * a literal value of `true` or `false`
 */
export type IT_BooleanLiteralToken = `Boolean(${"true" | "false"})`;
/**
 * **IT_ObjectLiteralDefinition**
 *
 * A dictionary object which is converted to an object literal definition.
 */
export type IT_ObjectLiteralDefinition = Record<string, InputTokenSuggestions>;

/**
 * A literal definition of a function.
 *
 *  - argument names will be preserved
 *  - return type is either a simple return type token _or_ a tuple:
 *
 *      `[ returns: token, props: Dictionary ]`
 *
 * ```ts
 * // (name: string, age: number) => string & { name: "getAge" }
 * const fnType = asType((name: string, age: number)) =>
 *          ["string", { name: "getAge" } ]
 * ```
 */
export type IT_FunctionLiteralToken = (...args: readonly any[]) => Suggest<IT_AtomicToken | "void"> | [returns: Suggest<IT_AtomicToken | "void">, props: Dictionary];

type MapToken = `Map<${string},${string}>`;
type SetToken = `Set<${string}>`;
// type WeakMapToken = `WeakMap<${string},${string}>`;
type RecordToken = `Record<${string},${string}>`;

export type IT_UnionToken = `${string}|${string}`;

type ConvertAtomic<T extends IT_AtomicToken> = T extends "string"
    ? string
    : T extends "number"
        ? number
        : T extends "boolean"
            ? boolean
            : T extends "null"
                ? null
                : T extends "undefined"
                    ? undefined
                    : T extends "unknown"
                        ? unknown
                        : T extends "any"
                            ? any
                            : T extends "true"
                                ? true
                                : T extends "false"
                                    ? false
                                    : Lowercase<T> extends "object"
                                        ? object
                                        : T extends "function"
                                            ? (...args: any[]) => any
                                            : Err<"invalid-token/wide", `The token '${T}' is not a valid wide token!`>;

type ArrToken<T extends string = string> = `Array<${T}>`;

type ConvertArr<T extends string> = T extends `Array<${infer Type}>`
    ? Trim<Type> extends IT_AtomicToken
        ? Array<ConvertAtomic<Trim<Type>>>
        : WhenErr<Union<Type>, { in: `Array<${Type}>` }> extends Error
            ? WhenErr<Union<Type>, { in: `Array<${Type}>` }>
            : Array<Union<Type>>
    : Err<"invalid-token/array", `Array definition failed [${T}]`>;

/**
 * Takes one known type off the lead of the string and returns
 * it's type along with the _remaining_ string.
 *
 * ```ts
 * [ type: T, remaining: string ]
 * ```
 */
type Take<
    T extends string
> = T extends ""
    ? Err<`invalid`, `empty string passed into Take!`>
    : T extends `${IT_AtomicToken}${infer Rest}`
        ? T extends `${infer Atomic}${Rest}`
            ? { type: ConvertAtomic<As<Atomic, IT_AtomicToken>>; leftover: Trim<Rest> }
            : Err<`invalid-token/atomic`, `The token "${T}" appeared to be an atomic token but was unable to be resolved.`>
        : T extends `Array<${string}`
            ? { type: FromInputToken<`${RetainUntil<T, ">">}>`>; leftover: RetainAfter<T, ">"> }
            : T extends `Record<${string}`
                ? WhenErr<ConvertRecord<`${RetainUntil<T, ">">}>`>, { using: "Take" }> extends Error
                    ? WhenErr<ConvertRecord<`${RetainUntil<T, ">">}>`>, { using: "Take" }>
                    : {
                        type: ConvertRecord<`${RetainUntil<T, ">">}>`>;
                        leftover: RetainAfter<T, ">">;
                    }
                : T extends `Map<${string}`
                    ? { type: FromInputToken<`${RetainUntil<T, ">">}>`>; leftover: RetainAfter<T, ">"> }
                    : T extends `String(${string}`
                        ? WhenErr<ConvertLiteral<`${RetainUntil<T, ")">})`>, { in: `String(${RetainUntil<T, ")">})` }> extends Error // `${RetainUntil<T, ")" >})`
                            ? WhenErr<ConvertLiteral<`${RetainUntil<T, ")">})`>, { in: `String(${RetainUntil<T, ")">})` }>
                            : {
                                type: ConvertLiteral<`${RetainUntil<T, ")">})`>;
                                leftover: RetainAfter<T, ")">;
                            }
                        : T extends `Number(${infer Num extends number})${infer Rest}`
                            ? { type: Num; leftover: Rest }
                            : T extends `Boolean(true)${infer Rest}`
                                ? { type: true; leftover: Rest }
                                : T extends `Boolean(false)${infer Rest}`
                                    ? { type: false; leftover: Rest }

                                    : Err<`invalid-token`, `unknown token: ${T}`>
;

type Next<
    T extends { leftover: string; types: readonly any[] }
> = Trim<T["leftover"]> extends `|${infer Rest}`
    ? Take<Trim<Rest>>
    : Take<Trim<T["leftover"]>>
;

type Union<
    /** the original token string the full type is derived from */
    TOrigin extends string,
    T extends { leftover: string; types: readonly any[] } = {
        leftover: TOrigin;
        types: [];
    }
> = Trim<T["leftover"]> extends ""
    ? T["types"][number]
    : Next<T> extends Error
        ? Next<T>
        : Next<T> extends { leftover: string; type: any }
            ? Trim<Next<T>["leftover"]> extends ""
                ? [...T["types"], Next<T>["type"]][number]
                : Union<TOrigin, { leftover: Next<T>["leftover"]; types: [...T["types"], Next<T>["type"]] }>
            : Err<`invalid-format`, `The return from Take() was unexpected; must exit: ${T["leftover"]} -> ${GetTypeOf<Next<T>>}`>;

type ConvertSet<
    T extends SetToken
> = T extends `Set<${infer Type}>`
    ? WhenErr<Convert<Type>, { in: `Set<${Type}>` }> extends Error
        ? WhenErr<Convert<Type>, { in: `Set<${Type}>` }>
        : Set<Convert<Type>>

    : Err<"invalid-token/set", `Failed to define Set type: ${T}`>;

type ConvertRecord<
    T extends string
> = T extends `Record<${infer Key},${infer Val}>`
    ? WhenErr<Convert<Key>, { in: `Record<${Key}, ${Val}>` }> extends Error
        ? WhenErr<Convert<Key>, { in: `Record<${Key}, ${Val}>` }>
        : WhenErr<Convert<Val>, { in: `Record<${Key}, ${Val}>` }> extends Error
            ? WhenErr<Convert<Val>, { in: `Record<${Key}, ${Val}>` }>
            : Convert<Key> extends ObjectKey
                ? Record<Convert<Key>, Convert<Val>>
                : Err<`invalid-token/record`, `the type of '${Key}' is not a valid object key!`>

    : Err<"invalid-token/map", `Failed to define Map type: ${T}`>;

type ConvertMap<
    T extends string
> = T extends `Map<${infer Key},${infer Val}>`
    ? WhenErr<Convert<Key>, { prop: "key"; in: `Map<${Key}, ${Val}>` }> extends Error
        ? WhenErr<Convert<Key>, { prop: "key"; in: `Map<${Key}, ${Val}>` }>
        : WhenErr<Convert<Val>, { prop: "val"; in: `Map<${Key}, ${Val}>` }> extends Error
            ? WhenErr<Convert<Val>, { prop: "val"; in: `Map<${Key}, ${Val}>` }>
            : Map<Convert<Key>, Convert<Val>>
    : Err<"invalid-token/map", `Failed to define Map type: ${T}`>;

type FnReturns<
    T extends ((...args: any[]) => string | [token: string, props: Dictionary])
> = ReturnType<T> extends [infer R extends string, Dictionary]
    ? R
    : ReturnType<T> extends string
        ? ReturnType<T>
        : never;

export type AsType<T extends InputTokenLike> = T extends string
    ? T
    : T extends ((...args: any[]) => string | [token: string, props: Dictionary])
        ? `(...args: any[]) => ${FnReturns<T>}`
        : T extends IT_ObjectLiteralDefinition
            ? `Object<${ToJson<T>}>`
            : "";

type _ConvertObjectLiteral<T extends Required<IT_ObjectLiteralDefinition>> = {
    [K in keyof T]: T[K] extends InputTokenLike
        ? FromInputToken<T[K]>
        : never
};

type CheckForPropertyErrors<
    TKv extends readonly KeyValue[],
    TSuccess,
    TModule extends string,
    TPrefix extends string
> = [] extends TKv
    ? TSuccess
    : First<TKv>["value"] extends Error
        ? Err<
        `invalid-token/${TModule}`,
        `${TPrefix}problem with '${As<First<TKv>["key"], string>}' key, ${First<TKv>["value"]["message"]}`,
        { context: {
            prop: First<TKv>["key"];
        }; }
        >
        : CheckForPropertyErrors<
            AfterFirst<TKv>,
            TSuccess,
            TModule,
            TPrefix
        >;

type ConvertObjectLiteral<
    T extends IT_ObjectLiteralDefinition
> = CheckForPropertyErrors<
    As<ToKv<_ConvertObjectLiteral<Required<T>>>, readonly KeyValue[]>,
    MakeKeysOptional<
        _ConvertObjectLiteral<Required<T>>,
        UnionToTuple<OptionalKeys<T>> extends readonly ObjectKey[]
            ? UnionToTuple<OptionalKeys<T>>
            : never
    >,
    `object`,
    `Failed to define object literal: `
>;

/**
 * The start of a literal token
 */
type LiteralTokenStart = "String(" | "Number(" | "Boolean(";

type LiteralBlock<
    T extends `${LiteralTokenStart}${string}`,
> = {
    kind: RetainUntil<T, "(">,
    variant: RetainUntil<
        RetainAfter<T, "(">,
        ")"
    >
   rest: RetainAfter<RetainAfter<T, "(">,")">
}

type Complete<T extends {
    kind: string,
    variant: string,
    rest: string
}> = T["kind"] extends "String"
? StringLiteralTemplate<T["variant"]>
: T["kind"] extends "Boolean"
    ? T["variant"] extends "true" ? true : false
: T["kind"] extends "Number"
    ? AsNumber<T["variant"]>
    : Err<"invalid-type/unknown-literal-type", `The literal type starting with ${T["kind"]} is now known!`>

/**
 * Converts a Literal token to it's literal type.
 */
type ConvertLiteral<
    T extends `${LiteralTokenStart}${string}`
> = Trim<LiteralBlock<T>["rest"]> extends ""
? Complete<LiteralBlock<T>>
: // there remains content after the literal type
  Trim<LiteralBlock<T>["rest"]> extends `|${string}`
    ? Union<
        T,
        {
            leftover: LiteralBlock<T>["rest"],
            types: [ Complete<LiteralBlock<T>> ]
        }
    >
    : never

;



type ContainerType = "Union" | "Tuple" | "Object";

;

/** converts a string token to a type where possible */
type Convert<
    T extends string
> = Trim<T> extends IT_AtomicToken
    ? ConvertAtomic<Trim<T>>
    : Trim<T> extends `${LiteralTokenStart}${string}`
        ? ConvertLiteral<Trim<T>>
        : Trim<T> extends ArrToken
            ? ConvertArr<Trim<T>>
            : Trim<T> extends SetToken
                ? ConvertSet<Trim<T>>
                : Trim<T> extends MapToken
                    ? ConvertMap<Trim<T>>
                    : Trim<T> extends `${infer R extends RecordToken}`
                        ? RetainChars<R, ">">["length"] extends 1
                            ? ConvertRecord<R>
                            : Union<R>

                        : Trim<T> extends IT_ObjectLiteralDefinition
                            ? ConvertObjectLiteral<Trim<T>>
                            : Trim<T> extends IT_UnionToken
                                ? Union<T>
                                : Err<`invalid-token/unknown`, `Unrecognized token: ${Trim<T>}`>;

/**
 * An input token is usually a _string_ which represents a _type_ but it
 * can also be:
 *
 * - A dictionary where the values are _string_ tokens
 * - A tuple who's elements are all _string_ tokens
 */
export type InputTokenLike = InputTokenSuggestions
| IT_ObjectLiteralDefinition
| readonly InputTokenSuggestions[];

/**
 * A branded type of `InputToken` which indicates that the _value_ has
 * been validated to be an `InputToken`.
 */
export type InputToken = InputTokenLike & {
    brand: "InputToken";
};

/**
 * **FromInputToken**`<T>`
 *
 * Converts an input token to a type, or produces an error with type
 * of `invalid-token` and a "subType" of whichever type structure caught
 * the error.
 *
 * InputToken's consist primarily as _string_ tokens of one of the following
 * variants:
 *
 * - an _atomic_ token (e.g., true, null, undefined, boolean, etc.)
 * - a _literal_ token (e.g., String(v), Number(v), Boolean(v), Record(k,v))
 * - an _object_ token (e.g., `{ ... }`)
 * - a _tuple_ token (e.g., `[ ... ]`)
 * - a _function_ token (e.g., `fn(...) => token` _or_ `async fn() => token )
 * - a _generator_ token (e.g., `gen(...) => token`)
 *
 *
 * **Related:** `FromInputTokenTuple`
 */
export type FromInputToken<
    T extends InputTokenLike,
    TR = T extends string ? Trim<T> : T
> = TR extends IT_ObjectLiteralDefinition
    ? ConvertObjectLiteral<TR>
    : TR extends readonly InputTokenLike[]
        ? Err<"invalid-token/tuple",`A tuple being used as an InputToken definition should always be passed into FromInputTokenTuple rather than a tuple slotted into the first array parameter of FromInputToken!`, { tuple: T } >

    : TR extends string
        ? Convert<TR>
        : TR extends IT_UnionToken
            ? Union<TR>
            : Err<`invalid-token/unknown`, `The token '${Trim<AsType<T>>}' is not a valid input token!`>;


export type FromInputTokenTuple<
    T extends readonly InputTokenLike[]
> = {
    [K in keyof T]: T[K] extends InputTokenLike
        ? FromInputToken<T[K]>
        : never
}
