import { Bracket, NumericChar, Punctuation, SpecialChar, Whitespace } from "src/types";


/**
 * Non-alphabetic characters including whitespace, string numerals, and
 */
export type NonAlphaChar = Whitespace | Punctuation | NumericChar | Bracket | SpecialChar;
