import type {
    LexerDelta,
    LexerState,
    NoMatch,
    StartsWith,
    StripFirst,
    StripLeading
} from "inferred-types/types";

/**
 * **TakeFunction**
 *
 * A _take function_ helps to extract a substring from the
 * HEAD of a string token and convert the substring into a Lexer token.
 *
 * - returning `NoMatch` indicates that the take function wasn't able to
 * match the HEAD of the current parse string.
 */
export type TakeFunction<
    TToken
> = <
    const TPayload extends {
        found: TFound,
        state: LexerState<TParseString, TLexerTokens>
    },
    TFound extends string,
    TParseString extends string,
    TLexerTokens extends readonly TToken[]
>(payload: TPayload) =>
| Error
| NoMatch
| LexerDelta<
    StripLeading<TPayload["state"]["parse"], TFound>,
    [...TLexerTokens, TToken]
>;


/**
 * **TakeWrapper**
 *
 * A builder/wrapper function around the core take callback.
 */
export type TakeWrapper<
    TToken,
    TTake extends readonly string[]
> = <
    TState extends LexerState<TParseString, TLexerTokens>,
    TParseString extends string,
    TLexerTokens extends readonly TToken[]
>(state: TState) => StartsWith<TParseString, TTake[number]> extends true
    ? LexerState<
        StripFirst<TParseString, TTake>,
        [...TLexerTokens, TToken]
    > | Error
    : NoMatch;


