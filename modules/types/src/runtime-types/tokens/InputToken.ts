import {
    Contains,
    Suggest,
    AfterFirst,
    First,
    Trim,
    OptSpace,
    Dictionary,
    AsLiteralFn,
    ToJson,
    MakeKeysOptional,
    ObjectKey,
    UnionToTuple,
    OptionalKeys,
    KeyValue,
    ToKv,
    As,
    StringLiteralTemplate,
    Err,
    RetainAfter,
    RetainUntil,
    IsEmpty,
    GetTypeOf,
} from "inferred-types/types";
import { FailFast } from "src/boolean-logic/branching/FailFast";

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

export type IT_TokenSuggest = Suggest<
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
export type IT_ObjectLiteralDefinition = Record<string, IT_TokenSuggest>;

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

export type IT_LiteralToken =
| IT_StringLiteralToken
| IT_NumericLiteralToken
| IT_BooleanLiteralToken
| IT_FunctionLiteralToken;

export type IT_AtomicToken =
| "string"
| "number"
| "boolean"
| "true"
| "false"
| "undefined"
| "unknown"
| "any"
| "null"
| "object"
| "Object"
| "function";

type MapToken = `Map<${string},${string}>`;
type SetToken = `Set<${string}>`;
type WeakMapToken = `WeakMap<${string},${string}>`
type RecordToken = `Record<${string},${string}>`

export type IT_ContainerToken =
| MapToken
| SetToken
| WeakMapToken
| RecordToken;

export type IT_UnionToken = `${string}|${string}`


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
? Object
: T extends "function"
? (...args: any[]) => any
: Err<"invalid-token/wide", `The token '${T}' is not a valid wide token!`>;


type Handle<
    TModule extends string,
    TPrefix extends string,
    TTest,
    TType,
    TPostfix extends string = ""
> = TTest extends Error
        ? Err<
            `invalid-token/${TModule}`,
            `${TPrefix}${TTest["message"]}${TPostfix}`
        >
        : TType;


type ArrToken<T extends string = string> = `Array<${T}>`;

type ConvertArr<T extends string> = T extends `Array<${infer Type}>`
? Type extends IT_AtomicToken
    ? Array<ConvertAtomic<Type>>
    : Contains<Type, "|"> extends true
        ? Handle<
            "array",
            `Array definition -- ${T} -- failed: `,
            Union<Type>,
            Array<Union<Type>>
        >
        : Err<"invalid-token/array", `Array definition failed [${T}]`>
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
    ? { type: ConvertAtomic<As<Atomic, IT_AtomicToken >>, leftover: Trim<Rest>}
    : Err<`invalid-token/atomic`, `The token "${T}" appeared to be an atomic token but was unable to be resolved.`>
: T extends `Array<${string}`
? { type: FromInputToken<`${RetainUntil<T,">">}>`>, leftover: RetainAfter<T,">">}
: T extends `Record<${string}`
? { type: FromInputToken<`${RetainUntil<T,">">}>`>, leftover: RetainAfter<T,">">}
: T extends `Map<${string}`
? {type: FromInputToken<`${RetainUntil<T,">">}>`>, leftover: RetainAfter<T,">">}
: T extends `String(${infer Lit}`
? { type: StringLiteralTemplate<RetainUntil<Lit,")">>, leftover: RetainAfter<Lit,")">}
: T extends `Number(${string}`
? {type: FromInputToken<`${RetainUntil<T,")">})`>, leftover: RetainAfter<T,")">}
: T extends `Boolean(true)${infer Rest}`
    ? {type: true, leftover: Rest}
: T extends `Boolean(false)${infer Rest}`
    ? {type: false, leftover: Rest}

: Err<`invalid-token`, `unknown token: ${T}`>
;


type Next<
    T extends { leftover: string; types: readonly any[]}
> = Trim<T["leftover"]> extends `|${infer Rest}`
        ? Take<Trim<Rest>>
        : Take<Trim<T["leftover"]>>
;

type Union<
    /** the original token string the full type is derived from */
    TOrigin extends string,
    T extends { leftover: string; types: readonly any[]} = {
        leftover: TOrigin,
        types: []
    }
> = Trim<T["leftover"]> extends ""
? T["types"][number]
: Next<T> extends Error
    ? Next<T>
    : Next<T> extends { leftover: string; type: any }
        ? Trim<Next<T>["leftover"]> extends ""
            ? [...T["types"], Next<T>["type"]][number]
            : Union<TOrigin, { leftover: Next<T>["leftover"]; types: [...T["types"], Next<T>["type"]]}>
        : Err<`invalid-format`,`The return from Take() was unexpected; must exit: ${T["leftover"]} -> ${GetTypeOf<Next<T>>}`>;


type ConvertSet<
    T extends SetToken
> = T extends `Set<${infer Type}>`
    ? TestConvert<
            Type,
            Set<ValidatedConvert<Type>>,
            `set`,
            `Failed to define Set type -- ${T} -- `

        >

: Err<"invalid-token/set", `Failed to define Set type: ${T}`>;

type ConvertMap<
    T extends MapToken
> =
T extends `Map<${infer Key},${infer Val}>`
? TestConvert<
        Key,
        TestConvert<
            Val,
            Map<ValidatedConvert<Key>, ValidatedConvert<Val>>,
            "map",
            `Failed to define Map type -- ${T} -- due to invalid value: `
        >,
        "map",
        `Failed to define Map type -- ${T} -- due to invalid key: `
    >
: Err<"invalid-token/map", `Failed to define Map type: ${T}`>;

type FnReturns<
    T extends ((...args: any[]) => string | [token: string, props: Dictionary])
> = ReturnType<T> extends [infer R extends string, Dictionary]
? R
: ReturnType<T> extends string
? ReturnType<T>
: never;

export type AsType<T extends InputToken> = T extends string
? T
: T extends ((...args: any[]) => string | [token: string, props: Dictionary])
? `(...args: any[]) => ${FnReturns<T>}`
: T extends IT_ObjectLiteralDefinition
    ? `Object<${ToJson<T>}>`
: "";

type _ConvertObjectLiteral<T extends Required<IT_ObjectLiteralDefinition>> = {
    [K in keyof T]: T[K] extends InputToken
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
    ? Err<`invalid-token/${TModule}`, `${TPrefix}${First<TKv>["value"]["message"]}`>
    : CheckForPropertyErrors<
        AfterFirst<TKv>,
        TSuccess,
        TModule,
        TPrefix
    >
;

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

type ConvertLiteral<
    T extends IT_LiteralToken
> = T extends `String(${infer Lit})`
? StringLiteralTemplate<Lit>
: T extends `Number(${infer Lit extends number})`
? Lit
: T extends `Boolean(${infer Lit extends "true" | "false"})`
? Lit extends "true" ? true : false
: T extends `(${infer Args})${OptSpace}=>${infer Returns}`
? T extends IT_FunctionLiteralToken
    ? ReturnType<T> extends [string, Dictionary]
        ? AsLiteralFn<
            Parameters<T>,
            FromInputToken<ReturnType<T>[0]>
        > & ReturnType<T>[1]
    : ReturnType<T> extends string
    ? AsLiteralFn<
        Parameters<T>,
        FromInputToken<ReturnType<T>>
    >
    : Err<`invalid-token/fn`, `The return type of the function literal was invalid. Return type should either be a token or a [token, Dictionary]!`>
    : Err<`invalid-token/fn`, `The function literal is invalid, return type is `>

: Err<"invalid-token/literal", `Failed to define Literal type: ${AsType<T>}`>;


/**
 * A utility which is used by converters to test the convertion of
 * underlying types so that errors can be bubbled up.
 */
type TestConvert<
    TToken extends string,
    TSuccess,
    TModule extends string,
    TPrefix extends string,
    TPostfix extends string = ""
> = Trim<TToken> extends IT_AtomicToken
? Handle<
    TModule,
    TPrefix,
    ConvertAtomic<Trim<TToken>> ,
    TSuccess,
    TPostfix
>

: Trim<TToken> extends IT_LiteralToken
?   Handle<
        TModule,
        TPrefix,
        ConvertLiteral<Trim<TToken>>,
        TSuccess,
        TPostfix
    >
: Trim<TToken> extends ArrToken
? Handle<
    TModule,
    TPrefix,
    ConvertArr<Trim<TToken>>,
    TSuccess,
    TPostfix
>
: Trim<TToken> extends SetToken
? Handle<
    TModule,
    TPrefix,
    ConvertSet<Trim<TToken>>,
    TSuccess,
    TPostfix
>
: Trim<TToken> extends MapToken
? Handle<
    TModule,
    TPrefix,
    ConvertMap<Trim<TToken>>,
    TSuccess,
    TPostfix
>
: Trim<TToken> extends IT_ObjectLiteralDefinition
? Handle<
    TModule,
    TPrefix,
    ConvertObjectLiteral<Trim<TToken>>,
    TSuccess,
    TPostfix
>
: Trim<TToken> extends IT_UnionToken
? Handle<
    TModule,
    TPrefix,
    Union<Trim<TToken>>,
    TSuccess,
    TPostfix
>
: Err<"invalid-token/unknown", `the token '${Trim<TToken>}' is not a valid input token!`>;

type ValidatedConvert<
    T extends string
> = Trim<T> extends IT_AtomicToken
? ConvertAtomic<Trim<T>>
: Trim<T> extends IT_LiteralToken
? ConvertLiteral<Trim<T>>
: Trim<T> extends ArrToken
? ConvertArr<Trim<T>>
: Trim<T> extends SetToken
? ConvertSet<Trim<T>>
: Trim<T> extends MapToken
? ConvertMap<Trim<T>>
: Trim<T> extends IT_ObjectLiteralDefinition
? ConvertObjectLiteral<Trim<T>>
: Trim<T> extends IT_UnionToken
? Union<T>
: Err<`invalid-token/unknown`, `A supposedly 'validated' token ran into an error; this should not happen`>;

/**
 * An input token is usually a _string_ which represents a _type_ but it
 * can also be:
 *
 * - A dictionary where the values are _string_ tokens
 * - A tuple who's elements are all _string_ tokens
 */
export type InputToken = string | IT_FunctionLiteralToken | IT_ObjectLiteralDefinition;


/**
 * **FromInputToken**`<T>`
 *
 * Converts an input token to a type, or produces an error with type
 * of `invalid-token` and a "subType" of whichever type structure caught
 * the error.
 */
export type FromInputToken<
    T extends InputToken,
    TR = T extends string ? Trim<T> : T
> = TR extends IT_AtomicToken
    ? ConvertAtomic<TR>
    : TR extends `String(${infer Literal}`
    ? Union<
        RetainAfter<Literal, ")">,
        { types: [StringLiteralTemplate<RetainUntil<Literal,")">>], leftover: RetainAfter<Literal, ")"> }
    >
    : TR extends ArrToken
    ? ConvertArr<TR>
    : TR extends SetToken
    ? ConvertSet<TR>
    : TR extends MapToken
    ? ConvertMap<TR>
    : TR extends IT_ObjectLiteralDefinition
    ? ConvertObjectLiteral<TR>
    : TR extends IT_UnionToken
    ? Union<TR>
    : Err<`invalid-token/unknown`, `The token '${Trim<AsType<T>>}' is not a valid input token!`>;

