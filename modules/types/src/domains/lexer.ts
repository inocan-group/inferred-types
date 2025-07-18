
/**
 * **LexerState**
 *
 * The _state_ for a Lexer.
 *
 * - the `parse` property carries the string component which still needs
 * parsing
 * - the `tokens` is a tuple of Lexer token's which have already been parsed
 * out of the origin string.
 *
 * A successful parse will see the lexer's state starts with a parse string and
 * no tokens and concludes when the parse string has been reduced to an empty string.
 *
 * If during parsing, the parse string is still not empty and none of the configured
 * take functions are able to parse any further then we reach an error state for the
 * parser.
 */
export type LexerState<
    T extends string = string,
    U extends readonly unknown[] = []
> = {
    parse: T;
    tokens: U;
};

/**
 * When a take function matches the HEAD of the the parse string,
 * it returns:
 *
 * - the _sub-string_ which it will be taking off the parse
 * string
 * - the Lexer token which has been created
 *
 * The wrapping take builder will convert this delta into the next
 * `LexerState` so that parsing can continue.
 */
export type LexerDelta<
    T extends string,
    U
> = [ T, U ];

