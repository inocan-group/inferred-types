import type { NoMatch } from "inferred-types/types";

/**
 * Used to indicate that a **take** function was not able to match
 * what it's configured to _take_ at the HEAD of the string being parsed
 * by the Lexer.
 */
export const NO_MATCH = "NO MATCH" as const satisfies NoMatch;
