import type {
    BRACKET_AND_QUOTE_NESTING,
    BRACKET_NESTING,
    QUOTE_NESTING,
} from "inferred-types/constants";

/**
 * **DefaultNesting**
 *
 * Includes all of the standard start/stop tokens
 * for brackets as a key-value pairing to be used
 * with utilities that deal with `Nesting`.
 */
export type DefaultNesting = typeof BRACKET_NESTING;

/**
 * nesting configuration which has matching opening and closing
 * brackets based on bracketing characters.
 */
export type BracketNesting = typeof BRACKET_NESTING;

/**
 * nesting configuration which treats all quote characters as
 * opening and closing characters.
 *
 * - if you start with `"` you end with `"`;
 * - if you start with `'`, you end with `'`.
 * - if you start with \`, you end with \`.
 */
export type QuoteNesting = typeof QUOTE_NESTING;

/**
 * **BracketAndQuoteNesting**
 *
 * Mixes the `QuoteNesting` and `BracketNesting` strategies together to
 * form a paired nesting strategy which includes all bracket characters
 * and quotation characters.
 */
export type BracketAndQuoteNesting = typeof BRACKET_AND_QUOTE_NESTING;
