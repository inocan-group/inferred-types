import type { Bracket, MatchChar, NumericChar, Punctuation, SpecialChar, Whitespace } from "inferred-types/types";

/**
 * **NonAlphaChar**
 *
 * Non-alphabetic characters including:
 * - Whitespace,
 * - Numeric chars,
 * - Math chars,
 * - Special chars
 * - Punctuation
 * -
 */
export type NonAlphaChar = Whitespace | Punctuation | NumericChar | Bracket | SpecialChar | MatchChar;
