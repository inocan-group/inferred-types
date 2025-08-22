import type { AlphaChar, As, Err, ErrType, FromInputToken, FromInputToken__String, GenericParam, IsInputToken, IsTrue, IT_Parameter, IT_ParameterResults, IT_TakeParameters, IT_Token, Join, OptSpace, Replace, Trim } from "inferred-types/types";

type Config = {
    generics: readonly GenericParam[],
    parameters: readonly IT_Parameter[],
    isAsync: boolean,
    returnToken: string,
    name?: string,
    isArrow: boolean
};

type BuildParams<
    TConfig extends Config,
    TParams extends string = Join<As<{
        [K in keyof TConfig["parameters"]]: TConfig["parameters"][K] extends infer Param extends readonly IT_Parameter
            ? `${Param["name"]}: ${Param["token"]}`
            : never
    }, readonly string[]>, ",">
> = As<
TConfig["generics"] extends []
? Join<[
    '( ',
    TParams,
    ' )'
]>
: Join<[
    '<',
    '',
    '>',
    '( ',
    TParams,
    ' )'
]>,
string>;

type BuildFnString<
    TConfig extends Config
> = [
    [TConfig["isAsync"]] extends [true] ? "async" : "",
    BuildParams<TConfig>,


];



;

type NamedSyncFunction<T extends string> = ;

type NamedAsyncFunction<T extends string> = ;

type AnonSyncFunction<T extends string> = ;

type AnonAsyncFunction<T extends string> = ;

type ArrowSyncFunction<T extends string> = IT_TakeParameters<T> extends infer P extends IT_ParameterResults
    ? P extends {
        parameters: infer Parameters extends readonly IT_Parameter[];
        generics: infer Generics extends readonly GenericParam[] | [];
        rest: infer Rest extends string
    }
        ? Rest extends `=>${infer Rest}`
            ? FromInputToken__String<Trim<Rest>> extends Error
                ? Err<"malformed-token">
            : {
                __kind: "IT_Token";
                kind: "fn";
                name: null;
                generics: Generics;
                parameters: Parameters;
                returnToken: Trim<Rest>;
                returnType: FromInputToken__String<Trim<Rest>>;
                token: BuildFnString<{
                    generics: Generics,
                    parameters: Parameters,
                    isAsync: false,
                    returnToken: Trim<Rest>,
                    isArrow: true
                }>;
            }
        : Err<"malformed-token">
    : never
: Err<
    "wrong-handler",
    `The token passed in can not be parsed as a synchronous Arrow function: '${Trim<T>}'`
>;

type ArrowAsyncFunction<T extends string> = T extends `async ${infer Rest extends string}`
    ? IT_TakeParameters<Trim<Rest>> extends infer P extends IT_ParameterResults
        ? P extends {
            parameters: infer Parameters extends readonly IT_Parameter[];
            generics: infer Generics extends readonly GenericParam[] | [];
            rest: infer Rest extends string
        }
            ? Rest extends `=>${infer Rest extends string}`
                ? FromInputToken__String<Trim<Rest>> extends Error
                    ? Err<
                        "malformed-token",
                        `The token '${T}' is being processed as a asynchronous arrow function but the return type -- '${Trim<Rest>}' -- was unable to be parsed.`
                    >
                : FromInputToken__String<Trim<Rest>> extends Promise<any>
                    ? {
                        __kind: "IT_Token";
                        kind: "fn";
                        name: null;
                        generics: Generics;
                        parameters: Parameters;
                        returnToken: Trim<Rest>;
                        returnType: FromInputToken__String<Trim<Rest>>;
                        token: BuildFnString<{
                            generics: Generics,
                            parameters: Parameters,
                            isAsync: true,
                            returnToken: Trim<Rest>,
                            isArrow: true
                        }>
                    }
                    : Err<
                        "malformed-token",
                        `An asynchronous function -- '${T}' -- MUST have a promise-based return type!`
                    >
            : never
        : Err<"wrong-handler">
    : Err<
    "wrong-handler",
    `The token passed in can not be parsed as an asynchronous Arrow function: '${Trim<T>}'`
>
: Err<
    "wrong-handler",
    `The token passed in can not be parsed as an asynchronous Arrow function: '${Trim<T>}'`
>;

type OptGenerics = `<${string}>` | "";

type Select<T extends readonly unknown[]> = T extends [infer Head, ...infer Rest extends readonly unknown[]]
? Head extends Err<"malformed-token">
    ? Head
: Head extends Error
    ? Select<Rest>
: Head

: Err<"wrong-handler">;

/**
 * **IT_TakeFunction**`<T>`
 *
 * Attempts to find a function (note: not a _generator_ function) at the head of a token string.
 * Will find the following variants:
 *
 *    - **named** _synchronous_ and _asynchronous_ functions
 *    - **anonymous** _synchronous_ and _asynchronous_ functions
 *    - **arrow** _synchronous_ and _asynchronous_ functions
 *
 * **Note:** _all variants also account for the possible use of **generics**_
 *
 * For **Generator** functions use `IT_TakeGeneratorFunction`.
 */
export type IT_TakeFunction<T extends string> = Select<[
    T extends `function ${AlphaChar}${string}${OptGenerics}(${string}` ? NamedSyncFunction<T> : Error,
    T extends `async function ${AlphaChar}${string}${OptGenerics}(${string}` ? NamedAsyncFunction<T> : Error,
    T extends `function ${OptSpace}${OptSpace}${OptGenerics}(${string}` ? AnonSyncFunction<T> : Error,
    T extends `${OptGenerics}(${string})${string}=>${string}` ? ArrowSyncFunction<T> : Error,
    T extends `async ${OptSpace}${OptSpace}(${string})${string}=>${string}` ? ArrowAsyncFunction<T> : Error,
]>

