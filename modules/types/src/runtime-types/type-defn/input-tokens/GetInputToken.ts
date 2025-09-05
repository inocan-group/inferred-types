import type {
    As,
    Err,
    ErrType,
    GetEach,
    InputTokenSuggestions,
    IsInputTokenSuccess,
    IT_TakeArray,
    IT_TakeAtomic,
    IT_TakeFunction,
    IT_TakeGroup,
    IT_TakeIntersection,
    IT_TakeKvObjects,
    IT_TakeLiteralArray,
    IT_TakeNumericLiteral,
    IT_TakeObjectLiteral,
    IT_TakeOutcome,
    IT_TakePromise,
    IT_TakeSet,
    IT_TakeStringLiteral,
    IT_TakeUnion,
    IT_Token,
    Trim
} from "inferred-types/types";

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
    TPrev extends IT_Token | undefined = undefined,
    TRemaining extends string = Trim<TToken>
> = TRemaining extends ""
    ? TPrev extends IT_Token
        ? TPrev
        : Err<
            "unparsed",
            `The token string was unable to be parsed! No parsing has taken place.`
        >

    // Combinators (inline)
    : TRemaining extends `|${string}`
        ? IT_TakeUnion<TPrev, TRemaining> extends infer U
            ? U extends IT_Token
                ? U
                : U extends Error
                    ? U
                    : never
            : never
    : TRemaining extends `&&${string}`
        ? TPrev extends IT_Token
            ? Err<
                "incomplete-parse",
                `The token string was not fully parsed; the text '${TRemaining}' remains unparsed`,
                {
                    underlying: readonly [TPrev];
                    parsedType: TPrev["type"];
                    rest: TRemaining;
                    combinator: "none";
                }
            >
            : Err<
                "unparsed",
                `The token string was unable to be parsed! No parsing has taken place.`
            >
    : TRemaining extends `&${string}`
        ? IT_TakeIntersection<TPrev, TRemaining> extends infer I
            ? I extends IT_Token
                ? I
                : I extends Error
                    ? I
                    : never
            : never

    // Atomic
    : Process<IT_TakeAtomic<TRemaining>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeAtomic<TRemaining>> extends (infer Success extends IT_Token)
            ? Iterate<Success["rest"], Success>

    // String Literal
    : Process<IT_TakeStringLiteral<TRemaining>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeStringLiteral<TRemaining>> extends (infer Success extends IT_Token)
            ? Iterate<Success["rest"], Success>

    // Numeric Literal
    : Process<IT_TakeNumericLiteral<TRemaining>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeNumericLiteral<TRemaining>> extends (infer Success extends IT_Token)
            ? Iterate<Success["rest"], Success>

    // KV Objects
    : Process<IT_TakeKvObjects<TRemaining>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeKvObjects<TRemaining>> extends (infer Success extends IT_Token)
            ? Iterate<Success["rest"], Success>

    // Arrays
    : Process<IT_TakeArray<TRemaining>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeArray<TRemaining>> extends (infer Success extends IT_Token)
            ? Iterate<Success["rest"], Success>

    // Promises
    : Process<IT_TakePromise<TRemaining>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakePromise<TRemaining>> extends (infer Success extends IT_Token)
            ? Iterate<Success["rest"], Success>

    // Sets
    : Process<IT_TakeSet<TRemaining>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeSet<TRemaining>> extends (infer Success extends IT_Token)
            ? Iterate<Success["rest"], Success>

    // Functions
    : Process<IT_TakeFunction<TRemaining>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeFunction<TRemaining>> extends (infer Success extends IT_Token)
            ? Iterate<Success["rest"], Success>

    // literal arrays
    : Process<IT_TakeLiteralArray<TRemaining>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeLiteralArray<TRemaining>> extends (infer Success extends IT_Token)
            ? Iterate<Success["rest"], Success>

    // object literals
    : Process<IT_TakeObjectLiteral<TRemaining>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeObjectLiteral<TRemaining>> extends (infer Success extends IT_Token)
            ? Iterate<Success["rest"], Success>

    // take grouped expression
    : Process<IT_TakeGroup<TRemaining>> extends infer E extends Error
        ? E // fast fail
        : Process<IT_TakeGroup<TRemaining>> extends (infer Success extends IT_Token)
            ? Iterate<Success["rest"], Success>

    // If we've parsed something already then this is an incomplete parse
    : TPrev extends IT_Token
        ? Err<
            "incomplete-parse",
            `The token string was not fully parsed; the text '${TRemaining}' remains unparsed`,
            {
                underlying: readonly [TPrev];
                parsedType: TPrev["type"];
                rest: TRemaining;
                combinator: "none";
            }
        >
        : Err<
            "unparsed",
            `The token string was unable to be parsed! No parsing has taken place.`
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
