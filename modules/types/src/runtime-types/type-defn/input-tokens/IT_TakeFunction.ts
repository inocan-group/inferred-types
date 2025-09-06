import type {
    AsLiteralTemplate,
    AsStaticTemplate,
    Contains,
    EmptyObject,
    Err,
    Extends,
    Find,
    FnFrom,
    FromInputToken,
    FromInputToken__String,
    GenericParam,
    IsStaticTemplate,
    IsTrue,
    IT_Parameter,
    IT_ParameterResults,
    IT_TakeParameters,
    IT_Token,
    TemplateMap__Generics,
    Trim,
    TypedFunction,
} from "inferred-types/types";

/**
 * **GetReturnType**`<TToken,TGenerics>`
 *
 * Determines the return type for a given function by matching the `TToken` on (in order):
 *
 * 1. Generic Name
 * 2. String Literal with reference to `TToken`
 * 3. parse as a normal InputToken
 */
// Strips surrounding quote characters from a string literal token
type StripSurroundingQuotes<T extends string> = T extends `"${infer R}"`
    ? R
    : T extends `'${infer R}'`
        ? R
        : T extends `\`${infer R}\``
            ? R
            : T;

type GetReturnType<
    TToken extends string,
    TGenerics extends readonly GenericParam[]
> = Trim<TToken> extends `Promise<${infer Inner extends string}>`
    ? Promise<GetReturnType<Trim<Inner>, TGenerics>>
    : Find<TGenerics, "objectKeyEquals", ["name", Trim<TToken>]> extends infer Generic extends GenericParam
        ? Generic["type"]
        : IsStaticTemplate<StripSurroundingQuotes<TToken>, TemplateMap__Generics<TGenerics>> extends true
            ? AsLiteralTemplate<
                AsStaticTemplate<StripSurroundingQuotes<TToken>, TemplateMap__Generics<TGenerics>>,
                TemplateMap__Generics<TGenerics>
            >
            : Contains<StripSurroundingQuotes<TToken>, "\${"> extends true
                ? AsLiteralTemplate<
                    AsStaticTemplate<StripSurroundingQuotes<TToken>, TemplateMap__Generics<TGenerics>>,
                    TemplateMap__Generics<TGenerics>
                >
                : FromInputToken__String<TToken>;

type NamedSyncFunction<T extends string> = Trim<T> extends `function ${infer AfterFunction extends string}`
    ? Trim<AfterFunction> extends `${infer Leading extends string}(${infer AfterParen extends string}`
        ? Leading extends `${infer Name extends string}<${infer GenericsBlock extends string}`
            // with generics
            ? Trim<Name> extends ""
                ? Err<"wrong-handler", `The function did not appear to have a name and therefore is not a named function.`, { token: T }>
                : IT_TakeParameters<`<${GenericsBlock}(${AfterParen}`> extends {
                    parameters: infer Parameters extends readonly IT_Parameter[];
                    generics: infer Generics extends readonly GenericParam[] | [];
                    rest: infer AfterParams extends string;
                }
                    ? Trim<AfterParams> extends `:${infer ReturnToken extends string}`
                        ? FnFrom<CalcParams<Parameters>, GetReturnType<Trim<ReturnToken>, Generics>, { name: Trim<Name> }> extends infer FnType extends TypedFunction
                            ? {
                                __kind: "IT_Token";
                                kind: "function";
                                name: Trim<Name>;
                                generics: Generics;
                                parameters: Parameters;
                                narrowing: true;
                                returnToken: AsStaticTemplate<Trim<ReturnToken>, TemplateMap__Generics<Generics>>;
                                returnType: GetReturnType<Trim<ReturnToken>, Generics>;
                                token: Trim<T>;
                                type: FnType;
                                isAsync: Extends<GetReturnType<Trim<ReturnToken>, Generics>, Promise<any>>;
                                rest: "";
                            }
                            : never
                        : Err<
                            "malformed-token",
                            `After successfully parsing the parameters of a named function, the return type was unable to be parsed because we couldn't find the expected ':' character used to separate the parameters from the return type`,
                            { token: T; rest: Trim<AfterParams>; parameter: Parameters; generics: Generics }
                        >
                    : Err<
                        "malformed-token",
                        `Failed to parse the parameters of what appeared to be a named function!`,
                        { token: T; rest: `<${GenericsBlock}(${AfterParen}`; attempt: IT_TakeParameters<`<${GenericsBlock}(${AfterParen}`> }
                    >
            // without generics
            : Trim<Leading> extends infer Name extends string
                ? Trim<Name> extends ""
                    ? Err<"wrong-handler", `The function did not appear to have a name and therefore is not a named function.`, { token: T }>
                    : IT_TakeParameters<`(${AfterParen}`> extends {
                        parameters: infer Parameters extends readonly IT_Parameter[];
                        generics: infer Generics extends readonly GenericParam[] | [];
                        rest: infer AfterParams extends string;
                    }
                        ? Trim<AfterParams> extends `:${infer ReturnTok}`
                            ? AsStaticTemplate<Trim<ReturnTok>, TemplateMap__Generics<Generics>> extends infer ReturnToken extends string
                                ? FnFrom<CalcParams<Parameters>, GetReturnType<Trim<ReturnToken>, Generics>, EmptyObject> extends infer FnType extends TypedFunction
                                    ? {
                                        __kind: "IT_Token";
                                        kind: "function";
                                        name: Trim<Name>;
                                        generics: Generics;
                                        parameters: Parameters;
                                        returnToken: ReturnToken;
                                        returnType: GetReturnType<Trim<ReturnTok>, Generics>;
                                        narrowing: false;
                                        token: Trim<T>;
                                        type: FnType & { name: Trim<Name> };
                                        isAsync: Extends<FromInputToken<Trim<ReturnTok>>, Promise<any>>;
                                        rest: "";
                                    }
                                    : never
                                : never
                            : Err<
                                "malformed-token",
                                `After successfully parsing the parameters of a named function, the return type was unable to be parsed because we couldn't find the expected ':' character used to separate the parameters from the return type`,
                                { token: T; rest: Trim<AfterParams>; parameter: Parameters; generics: Generics }
                            >
                        : Err<
                            "malformed-token",
                            `Failed to parse the parameters of what appeared to be a named function!`,
                            { token: T; rest: `(${AfterParen}`; attempt: IT_TakeParameters<`(${AfterParen}`> }
                        >
                : never
        : Err<"wrong-handler">
    : Err<"wrong-handler">;

;

type NamedAsyncFunction<T extends string> = T extends `async ${infer Rest}`
    ? NamedSyncFunction<Trim<Rest>> extends Err<"malformed-token">
        ? NamedSyncFunction<Trim<Rest>> // Error exit
        : NamedSyncFunction<Trim<Rest>> extends infer Token extends IT_Token<"function">
            ? IsTrue<Token["isAsync"]> extends true
                ? Token
                : Err<"malformed-token">
            : Err<"wrong-handler">
    : Err<`wrong-handler`, `The NamedAsyncFunction<T> can not parse the token '${T}'`>;

type AnonSyncFunction<T extends string> = Trim<T> extends `function ${infer Rest}`
    ? IT_TakeParameters<Trim<Rest>> extends infer P extends IT_ParameterResults
        ? P extends {
            parameters: infer Parameters extends readonly IT_Parameter[];
            generics: infer Generics extends readonly GenericParam[] | [];
            rest: infer Rest extends string;
        }
            ? Rest extends `:${infer ReturnToken extends string}`
                ? GetReturnType<Trim<ReturnToken>, Generics> extends Error
                    ? Err<
                        `malformed-token`,
                            `The arrow function -- '${Trim<T>}' -- has a return type '${Trim<ReturnToken>}' which could not be parsed to a type!`,
                            { generics: Generics; parameters: Parameters; returnToken: AsStaticTemplate<Trim<ReturnToken>, TemplateMap__Generics<Generics>> }
                    >
                    : FnFrom<CalcParams<Parameters>, GetReturnType<Trim<ReturnToken>, Generics>, EmptyObject> extends infer FnType extends TypedFunction

                        ? {
                            __kind: "IT_Token";
                            kind: "function";
                            name: null;
                            generics: Generics;
                            parameters: Parameters;
                            narrowing: Generics extends [] ? false : true;
                            returnToken: AsStaticTemplate<Trim<ReturnToken>, TemplateMap__Generics<Generics>>;
                            returnType: GetReturnType<Trim<ReturnToken>, Generics>;
                            token: Trim<T>;
                            type: FnType;
                            isAsync: Extends<
                                GetReturnType<Trim<ReturnToken>, Generics>,
                                Promise<any>
                            >;
                            rest: "";
                        }
                        : never
                : Err<"malformed-token", `Expected return type after ':' in an anonymous function`>
            : never
        : Err<"wrong-handler", `Unable to parse parameters for async anonymous function: '${T}'`>
    : Err<"wrong-handler", `Not a valid async anonymous function: '${T}'`>;

type AnonAsyncFunction<T extends string> = T extends `async ${infer Rest extends string}`
    ? AnonSyncFunction<Trim<Rest>> extends Error
        ? AnonSyncFunction<Trim<Rest>> // Error exit
        : AnonSyncFunction<Trim<Rest>> extends infer Token extends IT_Token<"function">
            ? IsTrue<Token["isAsync"]> extends true
                ? Token
                : Err<
                    "malformed-token",
                    `An asynchronous function MUST return a Promise!`,
                    { token: Trim<T>; returnType: Token["returnType"] }
                >
            : never
    : Err<"wrong-handler">;

type CalcParams<
    T extends readonly IT_Parameter[]
> = {
    [K in keyof T]: T[K]["type"]
};

type ArrowSyncFunction<T extends string> = IT_TakeParameters<T> extends infer P extends IT_ParameterResults
    ? P extends {
        parameters: infer Parameters extends readonly IT_Parameter[];
        generics: infer Generics extends readonly GenericParam[] | [];
        rest: infer Rest extends string;
    }
        ? Trim<Rest> extends `=>${infer ReturnToken extends string}`
            ? GetReturnType<Trim<ReturnToken>, Generics> extends Error
                ? Err<
                    `malformed-token`,
                    `The arrow function -- '${Trim<T>}' -- has a return type '${Trim<ReturnToken>}' which could not be parsed to a type!`,
                    { generics: Generics; parameters: Parameters; returnToken: AsStaticTemplate<Trim<ReturnToken>, TemplateMap__Generics<Generics>> }
                >
                : FnFrom<CalcParams<Parameters>, GetReturnType<Trim<ReturnToken>, Generics>, EmptyObject> extends infer FnType extends TypedFunction

                    ? {
                        __kind: "IT_Token";
                        kind: "function";
                        name: null;
                        generics: Generics;
                        parameters: Parameters;
                        narrowing: Generics extends [] ? false : true; // generics imply narrowing
                        isAsync: GetReturnType<Trim<ReturnToken>, Generics> extends Promise<any> ? true : false;
                        returnToken: AsStaticTemplate<Trim<ReturnToken>, TemplateMap__Generics<Generics>>;
                        returnType: GetReturnType<Trim<ReturnToken>, Generics>;
                        token: T;
                        type: FnType;
                        rest: "";
                    }
                    : never
            : Err<"malformed-token", `An arrow function requires the '=>' operator but it was not found, got: '${Rest}'`>
        : never
    : Err<"wrong-handler", `The token passed in can not be parsed as a synchronous Arrow function: '${Trim<T>}'`>;

type ArrowAsyncFunction<T extends string> = T extends `async ${infer Rest extends string}`
    ? ArrowSyncFunction<Trim<Rest>> extends Error
        ? ArrowSyncFunction<Trim<Rest>>
        : ArrowSyncFunction<Trim<Rest>> extends infer Token extends IT_Token<"function">
            ? IsTrue<Token["isAsync"]> extends true
                ? Omit<Token, "token"> & Record<"token", Trim<T>>
                // Set<Token, "token", Trim<T>>
                : Err<
                    `malformed-token`,
                    `An async function must always return a promise!`,
                    { token: T }
                >
            : never
    : Err<"wrong-handler", `The token passed in can not be parsed as an asynchronous Arrow function: '${Trim<T>}'`>;

type OptGenerics = `<${string}>` | "";

/**
 * iterates over the various function signatures and returns when:
 *
 * 1. a variant returns an Error of the type "malformed-token"
 * 2. a variant returns a successful outcome which _extends_ `IT_Token<"fn">`
 */
type Select<
    T extends readonly unknown[],
    TToken extends string,
    TVariants extends readonly unknown[] = T
> = T extends [infer Head, ...infer Rest extends readonly unknown[]]
    ? Head extends Err<"malformed-token">
        ? Head
        : Head extends Error
            ? Select<Rest, TToken, TVariants>
            : Head
    : Err<
        "wrong-handler",
        `None of the variants for functions was able to parse the token: '${TToken}'`,
        { token: TToken; utility: "IT_TakeFunction"; variants: TVariants }
    >;

type InvalidNamedFunction<T extends string, A extends string = ""> = Err<
    `malformed-token/named-function`,
    `The token started with the text '${A}function' and thereby clearly indicated a function definition but the remaining text -- ${T} -- was not parsable! Remember that when using the 'function' keyword the return type is delimited by a ':' character and NOT an arrow. You CAN use an arrow function but that should NOT include the 'function' keyword.`,
    { token: `${A}function ${T}` }
>;

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
    T extends `function ${string}(${string}):${string}` ? NamedSyncFunction<T> : Error,
    T extends `async function ${string}(${string}):${string}` ? NamedAsyncFunction<T> : Error,
    T extends `function ${OptGenerics}(${string}):${string}` ? AnonSyncFunction<T> : Error,
    T extends `async function ${OptGenerics}(${string}):${string}` ? AnonAsyncFunction<T> : Error,
    T extends `${OptGenerics}(${string}) => ${string}` ? ArrowSyncFunction<T> : Error,
    T extends `async ${OptGenerics}(${string}) => ${string}` ? ArrowAsyncFunction<T> : Error,
    T extends `function ${infer Rest extends string}` ? InvalidNamedFunction<Rest> : Error,
    T extends `async function ${infer Rest extends string}` ? InvalidNamedFunction<Rest, "async "> : Error
], T>;
