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
    IT_TakeFunction,
    IT_TakeKvObjects,
    IT_TakeNumericLiteral,
    IT_TakeOutcome,
    IT_TakePromise,
    IT_TakeSet,
    IT_TakeStringLiteral,
    IT_Token,
    Join,
    Length,
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
        : null;

/**
 * **Iterate**`<TToken>`
 *
 * Iterates over all of the known _take_ functions for InputToken's
 * and parses to as much as possible.
 *
 * - if `TToken` is able to be reduced to "" then the job is considered
 * to be complete and the results will be passed to `Finalize`
 * - if `TToken` still has content in it after all take functions have
 * had a chance to reduce it, then one of two errors will result:
 *
 *     - `incomplete-parse` is returned when at least _some_ of the original
 *     token string has been parsed
 *       - the `parsedType` property will provide the _type_ up to the point
 *       of reaching this incomplete state
 *       - the `rest` property exposes what is left _unparsed_
 *
 *     - `unparsed` is returned when no parsing was possible
 */
type Iterate<
    TToken extends string,
    TTypes extends readonly IT_Token[] = [],
    TCombinator extends IT_Combinator = "none",
    TTrim extends string = Trim<TToken>
> = TTrim extends ""
    ? Finalize<TTypes, TCombinator>

    // Atomic
    : Process<IT_TakeAtomic<TTrim>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeAtomic<TTrim>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >
    // String Literal
    : Process<IT_TakeStringLiteral<TTrim>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeStringLiteral<TTrim>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >
    // Numeric Literal
    : Process<IT_TakeNumericLiteral<TTrim>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeNumericLiteral<TTrim>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >
    // KV Objects
    : Process<IT_TakeKvObjects<TTrim>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeKvObjects<TTrim>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >
    // Arrays
    : Process<IT_TakeArray<TTrim>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeArray<TTrim>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >
    // Promises
    : Process<IT_TakePromise<TTrim>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakePromise<TTrim>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >
    // Sets
    : Process<IT_TakeSet<TTrim>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeSet<TTrim>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >
    // Functions
    : Process<IT_TakeFunction<TTrim>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeFunction<TTrim>> extends (infer Success extends IT_Token)
            ? Iterate<
                Success["rest"],
                [...TTypes, Success],
                TCombinator
            >

    : TTrim extends `|${infer Rest extends string}`
        ? Iterate<Rest, TTypes, "union">

: Length<TTypes> extends 0
    ? Err<
        "unparsed",
        `The token string was unable to be parsed! No parsing has taken place.`
    >

: Err<
    "incomplete-parse",
    `The token string was not fully parsed; the text '${TTrim}' remains unparsed`,
    {
        underlying: TTypes;
        parsedType: TCombinator extends "none"
            ? TTypes extends [infer Only extends IT_Token]
                ? Only["type"]
                : never
            : TCombinator extends "union"
                ? GetEach<TTypes, "type"> extends infer Types extends readonly unknown[]
                    ? Types[number]
                    : never
            : TCombinator extends "intersection"
                ? GetEach<TTypes, "type"> extends infer Types extends readonly unknown[]
                    ? TupleToIntersection<Types>
                    : never
            : never;
        rest: TTrim;
        combinator: TCombinator
    }
>;

/**
 * **GetInputToken**`<T>`
 *
 * Passing in a valid string `InputToken`, this utility will provide
 * you back an `IT_Token` which provides meta data about the token
 * including the _type_ which this token represents.
 *
 * - if all you want back is the _type_ then you're better off using
 * the `FromInputToken<T>` or `FromInputToken__String<T>` utilities.
 *
 * Possible error variants from this utility include:
 *
 * 1. `unparsed` - unable to parse the token string at all!
 * 2. `incomplete-parse` - part of the token _was_ parsed but there
 * is remaining text which can not be parsed.
 * 3. `invalid-union` - when the parser has detected the _combinator_
 * to be a union type, then the number of underlying types must be at
 * least two
 * 4. `invalid-intersection` - when the parser has detected the _combinator_
 * to be an intersection type, then the number of underlying types must
 * be at least two
 *
 * However, the most common Error type is `malformed-token` which will
 * be returned anytime the parsing process is mid-stream in parsing a
 * known type and some portion of that token is invalid. These errors
 * should have lots of contextual properties to help the caller understand
 * where the error is occurring.
 */
export type GetInputToken<T extends InputTokenSuggestions> = Iterate<T>;
