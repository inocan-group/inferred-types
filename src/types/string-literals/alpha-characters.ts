import { IsStringLiteral } from "../boolean-logic";







/**
 * Numeric string characters
 */
export type NumericChar = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

/**
 * Valid hexadecimal characters
 */
export type HexadecimalChar = NumericChar | "A" | "B" | "C" | "D" | "E" | "F" | "a" | "b" | "c" | "d" | "e" | "f";

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


export type AlphaNumeric<T extends string> = IsStringLiteral<T> extends true
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
