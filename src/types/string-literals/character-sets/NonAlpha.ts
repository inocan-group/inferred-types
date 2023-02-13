import { Bracket } from "./brackets";
import { NumericChar } from "./NumericChar";
import { Punctuation } from "./Punctuation";
import { SpecialChar } from "./SpecialChar";
import { Whitespace } from "./Whitespace";

/**
 * Non-alphabetic characters including whitespace, string numerals, and
 */
export type NonAlphaChar = Whitespace | Punctuation | NumericChar | Bracket | SpecialChar;
