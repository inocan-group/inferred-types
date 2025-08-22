import type {
    As,
    Err,
    ErrType,
    GetEach,
    InputTokenSuggestions,
    IsInputTokenSuccess,
    IT_Combinators as IT_Combinator,
    IT_TakeArray,
    IT_TakeAtomic,
    IT_TakeKvObjects,
    IT_TakeNumericLiteral,
    IT_TakeOutcome,
    IT_TakePromise,
    IT_TakeStringLiteral,
    IT_Token,
    Join,
    Trim,
    TupleToIntersection
} from "inferred-types/types";
import { } from "./IT_TakeArray";

type Finalize<
    TTypes extends readonly IT_Token[],
    TCombinator extends IT_Combinator
>
= TCombinator extends "none"
    ? TTypes extends [infer Token extends IT_Token]
        ? Token
        : TTypes extends []
            ? undefined
            : Err<
                `no-combinator`,
            `Parsing the string input token resulted in ${TTypes["length"]} types but no combinator (e.g., 'union', 'intersection') so there is no way to combine these types!`,
            { tokens: TTypes; types: GetEach<TTypes, "type"> }
            >
    : TCombinator extends "union"
        ? TTypes extends [IT_Token, IT_Token, ...IT_Token[]]
            ? As<
                {
                    __kind: "IT_Token";
                    kind: "union";
                    token: GetEach<TTypes, "token"> extends infer Tokens extends readonly string[]
                        ? Join<Tokens, " | ">
                        : never;
                    type: GetEach<TTypes, "type"> extends infer Types extends readonly unknown[]
                        ? Types[number]
                        : never;
                    members: TTypes;
                    rest: "";
                },

                IT_Token<"union">
            >
            : Err<
                "invalid-union",
        `A 'union' combinator requires at least two types to be defined but we only got ${TTypes["length"]}`,
        { tokens: TTypes }
            >
        : TCombinator extends "intersection"
            ? TTypes extends [IT_Token, IT_Token, ...IT_Token[]]
                ? TupleToIntersection<TTypes>
                : Err<
                    "invalid-union",
        `An 'intersection' combinator requires at least two types to be defined but we only got ${TTypes["length"]}`,
        { tokens: TTypes }
                >
            : never;

type Process<
    T extends IT_TakeOutcome
> = IsInputTokenSuccess<T> extends true
    ? T extends infer Token extends IT_Token<infer _Kind>
        ? Token
        : IT_Token
    : T extends Error
        ? ErrType<T> extends "malformed-token"
            ? T
            : null
        : null
;

type Iterate<
    TToken extends string,
    TTypes extends readonly IT_Token[] = [],
    TCombinator extends IT_Combinator = "none",
    T extends string = Trim<TToken>
> = T extends ""
    ? Finalize<TTypes, TCombinator>

    // Atomic
    : Process<IT_TakeAtomic<T>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeAtomic<T>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >
    // String Literal
    : Process<IT_TakeStringLiteral<T>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeStringLiteral<T>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >
    // Numeric Literal
    : Process<IT_TakeNumericLiteral<T>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeNumericLiteral<T>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >
    // KV Objects
    : Process<IT_TakeKvObjects<T>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeKvObjects<T>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >
    // Arrays
    : Process<IT_TakeArray<T>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeArray<T>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >
    // Promises
    : Process<IT_TakePromise<T>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakePromise<T>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >

            : T extends `|${infer Rest extends string}`
                ? Iterate<Rest, TTypes, "union">

                : Err<
                    "incomplete-parse",
                    `The token string was not fully parsed`,
                    { underlying: TTypes; token: T }
                >;

/**
 * **GetInputToken**`<T>`
 *
 * Passing in a valid string `InputToken`, this utility will provide
 * you back an `IT_Token` which provides meta data about the token
 * including the _type_ which this token represents.
 *
 * If all you want back is the _type_ then you're better off using
 * the `FromInputToken<T>` or `FromInputToken__String<T>` utilities.
 */
export type GetInputToken<T extends InputTokenSuggestions> = Iterate<T>;
