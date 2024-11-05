import { Bracket, NumericChar, Punctuation, SpecialChar, Whitespace } from "inferred-types/dist/types/index";


/**
 * Non-alphabetic characters including whitespace, string numerals, and
 */
export type NonAlphaChar = Whitespace | Punctuation | NumericChar | Bracket | SpecialChar;
