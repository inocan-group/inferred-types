import type { AlphaChar, AlphanumericChar, As, Err, ErrType, Extends, FromInputToken, FromInputToken__String, GenericParam, IsAlphanumeric, IsInputToken, IsNarrowingFn, IsTrue, IT_Parameter, IT_ParameterResults, IT_TakeParameters, IT_Token, Join, OptSpace, Replace, Trim, ValidateCharacterSet } from "inferred-types/types";

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
        [K in keyof TConfig["parameters"]]: TConfig["parameters"][K] extends infer Param extends IT_Parameter
            ? `${Param["name"]}: ${Param["token"]}`
            : never
    }, readonly string[]>, ", ">
> = TConfig["generics"] extends []
    ? `(${TParams})`
    : `<${Join<As<{
        [K in keyof TConfig["generics"]]: TConfig["generics"][K] extends infer Generic extends GenericParam
            ? Generic["name"]
            : never
    }, readonly string[]>, ", ">}>(${TParams})`;


type NamedSyncFunction<T extends string> = Trim<T> extends `function ${infer Rest extends string}`
    ? Trim<Rest> extends `${infer Name extends string}(${infer Rest}`
        // no generics
        ? IsAlphanumeric<Trim<Name>> extends true
            ? IT_TakeParameters<`(${Rest}`> extends {
                parameters: infer Parameters extends readonly IT_Parameter[];
                generics: infer Generics extends readonly GenericParam[] | [];
                rest: infer Rest extends string
            }
                ? Trim<Rest> extends `:${infer Rest}`
                    ? FromInputToken<Trim<Rest>> extends Error
                        ? Err<
                            "malformed-token",
                            `After successfully parsing the parameters of a named function, the return type -- '${Trim<Rest>}' -- can not be parsed into a valid type!`,
                            { token: Trim<T>, name: Trim<Name>, rest: Trim<Rest> }
                        >
                        : {
                            __kind: "IT_Token";
                            kind: "function";
                            name: Trim<Name>;
                            generics: Generics;
                            parameters: Parameters;
                            returnToken: Trim<Rest>;
                            returnType: FromInputToken<Trim<Rest>>;
                            narrowing: false;
                            token: Trim<T>;
                            type: any; // TODO this is WRONG!
                            isAsync: Extends<FromInputToken<Trim<Rest>>, Promise<any>>;
                            rest: ""; // TODO this is not static
                        }
                    : Err<
                        "malformed-token",
                        `After successfully parsing the parameters of a named function, the return type was unable to be parsed because we couldn't find the expected ':' character used to separate the parameters from the return type`,
                        { token: T; rest: Trim<Rest>; parameter: Parameters; generics: Generics }
                    >
                : Err<
                    "malformed-token",
                    `Failed to parse the parameters of what appeared to be a named function!`,
                    { token: T; rest: `(${Rest}`; attempt: IT_TakeParameters<`(${Rest}`> }
                >
            : Err<
                "malformed-token",
                `While attempting to parse what appeared to be a named function -- '${Trim<T>}' -- the name of the function ['${Trim<Name>}'] did NOT meet the requirement of being alphanumeric!`,
                { token: T; name: Trim<Name>; rest: Trim<Rest> }
            >
        // with generics
        : Trim<Rest> extends `${infer Name extends string}<${infer Rest extends string}`
            ? ValidateCharacterSet<Trim<Name>, AlphanumericChar | "_"> extends infer Name extends string
                ? IT_TakeParameters<`<${Rest}`> extends {
                    parameters: infer Parameters extends readonly IT_Parameter[];
                    generics: infer Generics extends readonly GenericParam[] | [];
                    rest: infer Rest extends string
                }
                    ? Trim<Rest> extends `:${infer Rest}`
                        ? FromInputToken<Trim<Rest>> extends Error
                            ? Err<"malformed-token">
                            : {
                                __kind: "IT_Token";
                                kind: "function";
                                name: Trim<Name>;
                                generics: Generics;
                                parameters: Parameters;
                                narrowing: false;
                                returnToken: Trim<Rest>;
                                returnType: FromInputToken<Trim<Rest>>;
                                token: Trim<T>;
                                type: any; // TODO this is WRONG!
                                isAsync: Extends<FromInputToken<Trim<Rest>>, Promise<any>>;
                                rest: ""; // TODO this is not static
                            }
                        : Err<
                            "malformed-token",
                            `After successfully parsing the parameters of a named function, the return type was unable to be parsed because we couldn't find the expected ':' character used to separate the parameters from the return type`,
                            { token: T; rest: Trim<Rest>; parameter: Parameters; generics: Generics }
                        >
                    : Err<
                        "malformed-token",
                        `Failed to parse the parameters of what appeared to be a named function!`,
                        { token: T; rest: `<${Rest}`; attempt: IT_TakeParameters<`<${Rest}`> }
                    >
            : Err<
                "malformed-token",
                `While attempting to parse what appeared to be a named function -- '${Trim<T>}' -- the name of the function ['${Trim<Name>}'] did NOT meet the requirement of being alphanumeric!`,
                { token: T; name: Trim<Name>; rest: Trim<Rest> }
            >

        : Err<
            "malformed-token",
            `While attempting to parse what appeared to be a named function -- '${Trim<T>}' -- the name couldn't be identified`,
            { token: T; rest: Trim<Rest> }
        >
    : Err<"wrong-handler">

;

type NamedAsyncFunction<T extends string> = Trim<T> extends `async function ${infer Name extends string}${infer Rest}`
    ? IT_TakeParameters<Rest> extends infer P extends IT_ParameterResults
        ? P extends {
            parameters: infer Parameters extends readonly IT_Parameter[];
            generics: infer Generics extends readonly GenericParam[] | [];
            rest: infer Rest extends string
        }
            ? Rest extends `: ${infer ReturnType extends string}`
                ? {
                    __kind: "IT_Token";
                    kind: "function";
                    name: Trim<Name>;
                    generics: Generics;
                    parameters: Parameters;
                    narrowing: Generics extends [] ? false : true;
                    returnToken: Trim<ReturnType>;
                    returnType: any; // Simplified to handle both concrete types and generic parameters
                    token: T;
                    type: any; // Function type inference - simplified to avoid infinite recursion
                    rest: "";
                }
                : Err<"malformed-token", `Expected return type after ':' in async named function`>
            : never
        : Err<"wrong-handler", `Unable to parse parameters for async named function: '${T}'`>
    : Err<"wrong-handler", `Not a valid async named function: '${T}'`>;

type AnonSyncFunction<T extends string> = Trim<T> extends `function${infer Rest}`
    ? IT_TakeParameters<Rest> extends infer P extends IT_ParameterResults
        ? P extends {
            parameters: infer Parameters extends readonly IT_Parameter[];
            generics: infer Generics extends readonly GenericParam[] | [];
            rest: infer Rest extends string
        }
            ? Rest extends `: ${infer ReturnType extends string}`
                ? {
                    __kind: "IT_Token";
                    kind: "function";
                    name: null;
                    generics: Generics;
                    parameters: Parameters;
                    narrowing: Generics extends [] ? false : true;
                    returnToken: Trim<ReturnType>;
                    returnType: any; // Simplified to handle both concrete types and generic parameters
                    token: T;
                    type: any; // Function type inference - simplified to avoid infinite recursion
                    rest: "";
                }
                : Err<"malformed-token", `Expected return type after ':' in anonymous function`>
            : never
        : Err<"wrong-handler", `Unable to parse parameters for anonymous function: '${T}'`>
    : Err<"wrong-handler", `Not a valid anonymous function: '${T}'`>;

type AnonAsyncFunction<T extends string> = Trim<T> extends `async function${infer Rest}`
    ? IT_TakeParameters<Rest> extends infer P extends IT_ParameterResults
        ? P extends {
            parameters: infer Parameters extends readonly IT_Parameter[];
            generics: infer Generics extends readonly GenericParam[] | [];
            rest: infer Rest extends string
        }
            ? Rest extends `: ${infer ReturnType extends string}`
                ? {
                    __kind: "IT_Token";
                    kind: "function";
                    name: null;
                    generics: Generics;
                    parameters: Parameters;
                    narrowing: Generics extends [] ? false : true;
                    returnToken: Trim<ReturnType>;
                    returnType: any; // Simplified to handle both concrete types and generic parameters
                    token: T;
                    type: any; // Function type inference - simplified to avoid infinite recursion
                    rest: "";
                }
                : Err<"malformed-token", `Expected return type after ':' in async anonymous function`>
            : never
        : Err<"wrong-handler", `Unable to parse parameters for async anonymous function: '${T}'`>
    : Err<"wrong-handler", `Not a valid async anonymous function: '${T}'`>;

type ArrowSyncFunction<T extends string> = IT_TakeParameters<T> extends infer P extends IT_ParameterResults
    ? P extends {
        parameters: infer Parameters extends readonly IT_Parameter[];
        generics: infer Generics extends readonly GenericParam[] | [];
        rest: infer Rest extends string
    }
        ? Rest extends ` =>${infer ReturnType extends string}`
            ? {
                __kind: "IT_Token";
                kind: "function";
                name: null;
                generics: Generics;
                parameters: Parameters;
                narrowing: IsNarrowingFn<any>; // Will be calculated from function type
                isAsync: Trim<ReturnType> extends `Promise<${string}>` ? true : false;
                returnToken: Trim<ReturnType>;
                returnType: any; // Simplified to handle both concrete types and generic parameters
                token: T;
                type: any; // Function type inference - simplified to avoid infinite recursion
                rest: "";
            }
            : Rest extends `=>${infer ReturnType extends string}`
                ? {
                    __kind: "IT_Token";
                    kind: "function";
                    name: null;
                    generics: Generics;
                    parameters: Parameters;
                    narrowing: Generics extends [] ? false : true;
                    returnToken: Trim<ReturnType>;
                    returnType: any; // Simplified to handle both concrete types and generic parameters
                    token: T;
                    type: any; // Function type inference - simplified to avoid infinite recursion
                    rest: "";
                }
            : Err<"malformed-token", `Expected ' =>' or '=>' in arrow function, got: '${Rest}'`>
        : never
    : Err<"wrong-handler", `The token passed in can not be parsed as a synchronous Arrow function: '${Trim<T>}'`>;

type ArrowAsyncFunction<T extends string> = T extends `async ${infer Rest extends string}`
    ? IT_TakeParameters<Trim<Rest>> extends infer P extends IT_ParameterResults
        ? P extends {
            parameters: infer Parameters extends readonly IT_Parameter[];
            generics: infer Generics extends readonly GenericParam[] | [];
            rest: infer Rest extends string
        }
            ? Rest extends ` => ${infer ReturnType extends string}`
                ? {
                    __kind: "IT_Token";
                    kind: "function";
                    name: null;
                    generics: Generics;
                    parameters: Parameters;
                    narrowing: Generics extends [] ? false : true;
                    returnToken: Trim<ReturnType>;
                    returnType: any; // Simplified to handle both concrete types and generic parameters
                    token: T;
                    type: any; // Function type inference - simplified to avoid infinite recursion
                    rest: "";
                }
                : Rest extends `=>${infer ReturnType extends string}`
                    ? {
                        __kind: "IT_Token";
                        kind: "function";
                        name: null;
                        generics: Generics;
                        parameters: Parameters;
                        narrowing: Generics extends [] ? false : true;
                            returnToken: Trim<ReturnType>;
                        returnType: any; // Simplified to handle both concrete types and generic parameters
                        token: T;
                        type: any; // Function type inference - simplified to avoid infinite recursion
                        rest: "";
                    }
                    : Err<"malformed-token", `Expected ' =>' or '=>' in async arrow function, got: '${Rest}'`>
            : never
        : Err<"wrong-handler", `Unable to parse parameters for async arrow function: '${T}'`>
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
        { token: TToken, utility: "IT_TakeFunction", variants: TVariants }
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
    T extends `function ${OptSpace}${AlphaChar}${string}${OptGenerics}(${string}):${string}` ? NamedSyncFunction<T> : Error,
    T extends `async function ${OptSpace}${AlphaChar}${string}${OptGenerics}(${string}):${string}` ? NamedAsyncFunction<T> : Error,
    T extends `function ${OptGenerics}(${string}):${string}` ? AnonSyncFunction<T> : Error,
    T extends `async function ${OptGenerics}(${string}):${string}` ? AnonAsyncFunction<T> : Error,
    T extends `${OptGenerics}(${string}) => ${string}` ? ArrowSyncFunction<T> : Error,
    T extends `async ${OptGenerics}(${string}) => ${string}` ? ArrowAsyncFunction<T> : Error,
], T>

