export type LowerAlpha = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

/** Uppercase alphabetic character */
export type UpperAlpha = Uppercase<LowerAlpha>;

/**
 * Alphabetical characters (upper and lower)
 */
export type Alpha = UpperAlpha | LowerAlpha;


export type Whitespace = " " | "\n" | "\t";

export type Punctuation = "." | "," | ";" | "!" | "?";
/**
 * Characters which typically are used to separate words (but not including a space)
 */
export type StringDelimiter = "_" | "-" | "/" | "\\";

export type OpenningBracket = "(" | "[" | "{";
export type ClosingBracket = ")" | "]" | "}";

/**
 * Openning and closing parenthesis
 */
export type Parenthesis = "(" | ")";

/**
 * Openning and closing brackets
 */
export type Bracket = OpenningBracket | ClosingBracket;

/**
 * Numeric string characters
 */
export type NumericString = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

/**
 * Any alphabetic or numeric string character
 */
export type AlphaNumeric = Alpha | NumericString;


export type SpecialCharacters = "@" | "~" | "^" | "#" | "&" | "*";

/**
 * Non-alphabetic characters including whitespace, string numerals, and 
 */
export type NonAlpha = Whitespace | Punctuation | NumericString | Bracket | SpecialCharacters;