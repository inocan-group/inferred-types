import type {
    SHALLOW_BRACKET_AND_QUOTE_NESTING,
    SHALLOW_BRACKET_NESTING,
    SHALLOW_QUOTE_NESTING
} from "inferred-types/constants";

/**
 * **ShallowBracketNesting**
 *
 * Hierarchical nesting configuration where bracket characters are recognized
 * at level 0, but inside brackets no further nesting is recognized.
 *
 * Useful for utilities that only care about root-level bracketing without
 * nested complexity.
 */
export type ShallowBracketNesting = typeof SHALLOW_BRACKET_NESTING;

/**
 * **ShallowQuoteNesting**
 *
 * Hierarchical nesting configuration where quote characters are recognized
 * at level 0, but inside quotes no further nesting is recognized.
 *
 * This treats quoted content as literals, perfect for split operations
 * that should ignore delimiters inside quotes.
 */
export type ShallowQuoteNesting = typeof SHALLOW_QUOTE_NESTING;

/**
 * **ShallowBracketAndQuoteNesting**
 *
 * Combines shallow bracket and quote nesting. Both brackets and quotes
 * are recognized at level 0, but inside either, no further nesting occurs.
 */
export type ShallowBracketAndQuoteNesting = typeof SHALLOW_BRACKET_AND_QUOTE_NESTING;
