import { IsStringLiteral } from "../boolean-logic";

export type LowerAlpha =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

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

export type OpeningBracket = "(" | "[" | "{";
export type ClosingBracket = ")" | "]" | "}";

/**
 * Opening and closing parenthesis
 */
export type Parenthesis = "(" | ")";

/**
 * Opening and closing brackets
 */
export type Bracket = OpeningBracket | ClosingBracket;

/**
 * Numeric string characters
 */
export type NumericChar = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

/**
 * Any alphabetic or numeric string character
 */
export type AlphaNumericChar = Alpha | NumericChar;

type AlphaNumericAcc<
  T extends string,
  TResult extends string
> = T extends ""
  ? TResult
  : // iterate through characters and look for exception
    T extends `${AlphaNumericChar}${infer REST}`
      ? AlphaNumericAcc<REST, TResult>
      : never;


export type Alphanumeric<T extends string> = IsStringLiteral<T> extends true
  ? AlphaNumericAcc<T, T>
  /** Invalid Alphanumeric string */
  : never;

/**
 * Allows alphanumeric characters and some special characters typically allowed
 * in variable names.
 */
export type VariableName = AlphaNumericChar | "_" | "." | "-";

export type SpecialChar = "@" | "~" | "^" | "#" | "&" | "*";

/**
 * Non-alphabetic characters including whitespace, string numerals, and
 */
export type NonAlphaChar = Whitespace | Punctuation | NumericChar | Bracket | SpecialChar;

export type Ipv4 = `${number}.${number}.${number}.${number}`;
