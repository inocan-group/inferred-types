import type {
    As,
    Err,
    ErrType,
    InputTokenSuggestions,
    IsInputTokenSuccess,
    IsNever,
    IT_TakeArray,
    IT_TakeAtomic,
    IT_TakeFunction,
    IT_TakeGenerator,
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

/**
 * Narrows the return type to:
 *
 *   - `Err<"malformed-token">` if handler tried to parse but hit an error while parsing
 *      - note: if the value is `never` it will also convert this to a `Err<"malformed-error">`
 *      because while this is NOT expected it does represent an unexpected failure of the take function
 *   - `IT_Token` if handler was successful at parsing the head of the string
 *   - `null` if a `wrong-handler` error was found
 */
type Process<
    T
> = IsNever<T> extends true
? Err<"unexpected-error/never", `A take function returned 'never'; this should not happen!`>
: T extends IT_TakeOutcome
    ? IsInputTokenSuccess<T> extends true
        ? T extends infer Token extends IT_Token<infer _Kind>
            ? Token
            : IT_Token
        : T extends Error
            ? ErrType<T> extends "malformed-token"
                ? T
                : null
            : null
: Err<"unexpected-error", `A take function returned an unexpected type!`, { type: T }>;

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
    TParse extends string,
    TToken extends IT_Token | undefined = undefined,
    TRemaining extends string = Trim<TParse>
> = TRemaining extends ""
    ? TToken extends IT_Token
        ? TToken // successful parse
        : Err<
            "empty-parse",
            `The token string was an empty string so there is nothing to parse!`
        >

// Atomic
: Process<IT_TakeAtomic<TRemaining>> extends infer E extends Error
    ? E // fast fail
    : Process<IT_TakeAtomic<TRemaining>> extends (infer Success extends IT_Token<"atomic">)
        ? Iterate<Success["rest"], Success>

// String Literal
: Process<IT_TakeStringLiteral<TRemaining>> extends infer E extends Error
    ? E // fast fail
    : Process<IT_TakeStringLiteral<TRemaining>> extends (infer Success extends IT_Token<"literal">)
        ? Iterate<Success["rest"], Success>

// Numeric Literal
: Process<IT_TakeNumericLiteral<TRemaining>> extends infer E extends Error
    ? E // fast fail
    : Process<IT_TakeNumericLiteral<TRemaining>> extends (infer Success extends IT_Token<"literal">)
        ? Iterate<Success["rest"], Success>

// KV Objects
: Process<IT_TakeKvObjects<TRemaining>> extends infer E extends Error
    ? E // fast fail
    : Process<IT_TakeKvObjects<TRemaining>> extends (infer Success extends IT_Token<"kv">)
        ? Iterate<Success["rest"], Success>

// Arrays
: Process<IT_TakeArray<TRemaining>> extends infer E extends Error
    ? E // fast fail
    : Process<IT_TakeArray<TRemaining>> extends (infer Success extends IT_Token<"array">)
        ? Iterate<Success["rest"], Success>

// Promises
: Process<IT_TakePromise<TRemaining>> extends infer E extends Error
    ? E // fast fail
    : Process<IT_TakePromise<TRemaining>> extends (infer Success extends IT_Token<"promise">)
        ? Iterate<Success["rest"], Success>

// Sets
: Process<IT_TakeSet<TRemaining>> extends infer E extends Error
    ? E // fast fail
    : Process<IT_TakeSet<TRemaining>> extends (infer Success extends IT_Token<"set">)
        ? Iterate<Success["rest"], Success>

// Generators
: Process<IT_TakeGenerator<TRemaining>> extends infer E extends Error
    ? E // fast fail
    : Process<IT_TakeGenerator<TRemaining>> extends (infer Success extends IT_Token<"generator">)
        ? Iterate<Success["rest"], Success>
// Functions
: Process<IT_TakeFunction<TRemaining>> extends infer E extends Error
    ? E // fast fail
    : Process<IT_TakeFunction<TRemaining>> extends (infer Success extends IT_Token<"function">)
        ? Iterate<Success["rest"], Success>

// literal arrays
: Process<IT_TakeLiteralArray<TRemaining>> extends infer E extends Error
    ? E // fast fail
    : Process<IT_TakeLiteralArray<TRemaining>> extends (infer Success extends IT_Token<"literal-array">)
        ? Iterate<Success["rest"], Success>

// object literals
: Process<IT_TakeObjectLiteral<TRemaining>> extends infer E extends Error
    ? E // fast fail
    : Process<IT_TakeObjectLiteral<TRemaining>> extends (infer Success extends IT_Token<"object-literal">)
        ? Iterate<Success["rest"], Success>

// take grouped expression
: Process<IT_TakeGroup<TRemaining>> extends infer E extends Error
    ? E // fast fail
    : Process<IT_TakeGroup<TRemaining>> extends (infer Success extends IT_Token<"group">)
        ? Iterate<Success["rest"], Success>

// Union
: Process<IT_TakeUnion<TRemaining, TToken>> extends infer E extends Error
    ? E
    : Process<IT_TakeUnion<TRemaining, TToken>> extends (infer Success extends IT_Token<"union">)
        ? Iterate<Success["rest"], Success>

// Intersection
// : Process<IT_TakeIntersection<TPrev, TRemaining>> extends infer E extends Error
//     ? E
//     : Process<IT_TakeIntersection<TPrev, TRemaining>> extends (infer Success extends IT_Token<"intersection">)
//         ? Iterate<Success["rest"], Success>

// Incomplete Parse
: TToken extends IT_Token
    ? Err<
        "incomplete-parse",
        `The token string was not fully parsed; the text '${TRemaining}' remains unparsed`,
        {
            underlying: readonly [TToken];
            parsedType: As<TToken, IT_Token>["type"];
            rest: TRemaining;
            combinator: "none";
        }
    >
    : Err<
        "unparsed",
        `The token string -- ${TRemaining} -- was unable to be parsed!`
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
export type GetInputToken<T extends InputTokenSuggestions> = string extends T
? IT_Token | Error
: Iterate<T>;
