import {
    AfterFirst,
    AfterFirstChar,
    AlphaChar,
    And,
    As,
    AsLiteralFn,
    AsNarrowingFn,
    Asynchronous,
    CharCount,
    Contains,
    Dictionary,
    EmptyObject,
    Err,
    Expand,
    FailFast,
    First,
    FirstChar,
    FromInputToken,
    FromStringInputToken,
    GetEach,
    If,
    IsDefined,
    IsGreaterThan,
    IsLessThan,
    Join,
    JustFunction,
    Length,
    Or,
    Replace,
    RetainAfter,
    Split,
    StripAfter,
    StripLeading,
    StripTrailing,
    Suggest,
    Synchronous,
    Trim,
    TypedParameter,
    Unset,
    UntilLast,
    Whitespace
} from "inferred-types/types";
import {
    IT_AtomicToken,
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens";

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


/**
 * **FnReturns**
 */
export type FnReturns<
    T extends ((...args: any[]) => string | [token: string, props: Dictionary])
> = ReturnType<T> extends [infer R extends string, Dictionary]
    ? R
    : ReturnType<T> extends string
        ? ReturnType<T>
        : never;

type Strip<T extends string> = Exclude<T,Whitespace>;
type Start = "async " | AlphaChar | "(";

type IsNarrowing<
    T extends string
> = Or<[
    Contains<T,"->">,
    Contains<T,"-+>">
]> extends true
? true
: false;

type KV<
    T extends string
> = Split<T, ":"> extends [string, string]
? {
    name: Trim<Split<T, ":">[0]>,
    token: Trim<Split<T, ":">[1]>
}
: never;

type NameToken = {name: string; token: string};


type SplitArgs<
    TStr extends string,
    TParts extends readonly string[] = Split<TStr, ",">
> = Length<TParts> extends 0
? As<[], readonly NameToken[]>
: As<Expand<{
    [K in keyof TParts]: TParts[K] extends string
        ? KV<TParts[K]>
        : never
}>, readonly NameToken[]>;

type ParseArgs<
    S extends string,
    T extends readonly NameToken[] = SplitArgs<IsolateArgs<S>>,
    R extends readonly TypedParameter[] = []
> = [] extends T
? R
: ParseArgs<
    S,
    AfterFirst<T>,
    [
        ...R,
        {
            name: First<T>["name"],
            type: FromInputToken<First<T>["token"]>
        }
    ]
>;

type IsEnclosed<T extends string> = Trim<T> extends `(${string}(${string}`
? FirstChar<AfterFirstChar<Trim<T>>,""> extends ")"
    ? false
    : RetainAfter<AfterFirstChar<Trim<T>>, ")"> extends `${string}${FunctionReturnSymbol}${string}`
        ? true
        : false


// And<[
//     StartsWith<Trim<T>, "(">,
//     Not<
//         Contains<
//             RetainAfter<AfterFirstChar<Trim<T>>, ")">,
//             FunctionReturnSymbol
//         >
//     >,
//     Not<StartsWith<AfterFirstChar<Trim<T>>,")">>
// ]>
: false;

/**
 * Ensures that if `T` is intended to be an enclosed function token
 * (aka, `(token)`) that the _leading_ parenthesis is removed.
 */
type Enclosure<T extends string> = IsEnclosed<Trim<T>> extends true
? StripLeading<Trim<T>, "(">
: Trim<T>;

/**
 * Holds any _modifiers_ for the function such as `async` or
 * the `name` of the function.
 */
type IsolatePreamble<T extends string> = StripAfter<Enclosure<T>, "(">;

type ParseName<T extends string> = T extends `${string}(${string}`
? Trim<StripLeading<IsolatePreamble<T>, "async">>
: never;


/**
 * A symbol used to define a function-based `InputToken`
 */
export type FunctionReturnSymbol = "->" | "=>" | "=+>" | "-+>";


/** returns key/value info based on what's left in the token */
type ParseReturn<
    T extends string
> = FromInputToken<IsolateReturn<T>>;

type FunctionKeyValue<T extends string> = Or<[
    Contains<T, "-+>">,
    Contains<T, "=+>">
]> extends true
    ? {
        name: ParseName<T>,
        parameters: ParseArgs<T>,
        returns: ParseReturn<T>
    }
    : undefined;

type RetainUntilLast<
    T extends string,
    C extends string
> = Split<T,C, "inline"> extends readonly [...(infer Leading extends readonly string[]), string]
    ? Join<Leading>
    : never;


/**
 * Isolates the text for the functions arguments/parameters
 */
type IsolateArgs<
    T extends string
> = Enclosure<T> extends `${string}(${infer Post extends string}`
        ? UntilLast<
            Post,
            ")",
            {
                break: FunctionReturnSymbol
            }
        >
        : never;

type IsolateReturn<
    T extends string
> = Trim<
    IsEnclosed<T> extends true
        ? Trim<
            StripTrailing<
            RetainUntilLast<
                RetainAfter<Enclosure<T>, FunctionReturnSymbol>,
                ")"
            >,
            ")"
            >
        >
        : Trim<RetainAfter<Enclosure<T>, FunctionReturnSymbol>>
>;

/** returned from Info<T> utility */
type InfoBlock = {
    enclosed: boolean;
    async:  boolean;
    name: string;
    args: readonly TypedParameter[];
    return: any;
    rest: string;
    narrowing: boolean;
    props?: unknown
}

type IsAsync<T extends string> = Contains<StripAfter<Enclosure<T>, FunctionReturnSymbol>,"async">;

type Info<T extends string> = As<
    Trim<T> extends `${string}(${string})${string}`
    ? FailFast<[
        ParseName<T>,
        IsolateArgs<T>,
        ParseArgs<T>,
        ParseReturn<T>,
        FunctionKeyValue<T>,
        Rest<T>,
        {
            enclosed: IsEnclosed<Trim<T>>,
            async: IsAsync<T>,
            name: ParseName<Trim<T>>,
            args: ParseArgs<T>,
            return: ParseReturn<T>,
            narrowing: IsNarrowing<T>,
            rest: Rest<T>,
            props: FunctionKeyValue<T>
        }
    ]>
    : Err<`invalid-token/function`, `The function '${Trim<T>}' could not be parsed!`>,
    InfoBlock | Error
>;

type BuildFunction<T extends InfoBlock> = T["narrowing"] extends true
? AsNarrowingFn<
    GetEach<T["args"], "type"> extends readonly any[]
        ? GetEach<T["args"], "type">
        : never,
    T["async"] extends true
        ? Asynchronous<T["return"]>
        : Synchronous<T["return"]>,
    T["name"] extends ""
        ? EmptyObject
        : If<IsDefined<T["props"]>, EmptyObject, { name: T["name"]}>
>
: // normal fn (aka, not narrowing)
    AsLiteralFn<
        GetEach<T["args"], "type"> extends readonly any[]
            ? GetEach<T["args"], "type">
            : never,
        T["async"] extends true
            ? Asynchronous<T["return"]>
            : Synchronous<T["return"]>,
        T["name"] extends ""
            ? EmptyObject
            : If<IsDefined<T["props"]>, EmptyObject, { name: T["name"]}>
    >


/** builds function _type_ from `InfoBlock` */
type Construct<
    T extends InfoBlock
> = IsDefined<T["props"]> extends true
? BuildFunction<T> & T["props"]
: BuildFunction<T>;


type Parse<T extends string> = Contains<T, ")"> extends true
    ? And<[
            IsGreaterThan<CharCount<T,"(">, 1>,
            IsLessThan<CharCount<T, ")">, 2>
        ]> extends true
        ? Err<
            `invalid-token/function`,
            `A function token with a leading parenthesis -- '${Trim<T>}' -- does not have a matching closing parenthesis to complete the token!`
        >
        : Info<T> extends Error
            ? Info<T>
            : Info<T> extends InfoBlock
                ? Construct<Info<T>>
                : never
    : Err<`invalid-token/function`, `The token '${T}' looks like a function but no terminating ')' character was found!`>;

type Rest<T extends string> = Trim<As<
    IsEnclosed<T> extends true
    ? StripLeading<Replace<
        Trim<RetainAfter<T, FunctionReturnSymbol>>,
        IsolateReturn<T>,
        ""
    >, ")">
    : Replace<
        Trim<RetainAfter<T, FunctionReturnSymbol>>,
        IsolateReturn<T>,
        ""
    >,
    string
>>;

/**
 * Takes a string representation of a function:
 *
 * - `foobar(name: string, age: number) => unknown` - named function
 * - `(name: string, age: number) => unknown` - anonymous function
 *
 * - `async foobar(name: string, age: number) => unknown` - async named
 * - `async (name: string, age: number) => unknown` - async anonymous
 *
 * and converts it to the function _type_ specified.
 */
export type IT_TakeFunction<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `${Start}${string}`
? FailFast<[
    Parse<T>,
    Rest<T>,
    FromStringInputToken<
        Rest<T>,
        [...TInner, Parse<T>],
        TContainers
    >
]>
: Unset;


// DEBUGGING SUPPORT BELOW

type T = "(name: string) =+> string";
type TEnclosed = IsEnclosed<T>;
type TPreample = IsolatePreamble<T>;
type TArgsToken = IsolateArgs<T>;
type TReturnToken = IsolateReturn<T>;

type TName = ParseName<T>;
type TAsync = IsAsync<T>;
type TArgs = ParseArgs<T>;
type TReturn = ParseReturn<T>;
type TKeyValue = FunctionKeyValue<T>;

type TInfo = Info<T>;
type TRest = Rest<T>;
type TParse = Parse<T>;
