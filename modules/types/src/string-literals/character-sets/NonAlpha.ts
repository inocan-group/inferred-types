import type { Bracket, NumericChar, Punctuation, SpecialChar, Whitespace } from "inferred-types/types";

/**
 * Non-alphabetic characters including whitespace, string numerals, and
 */
export type NonAlphaChar = Whitespace | Punctuation | NumericChar | Bracket | SpecialChar;
