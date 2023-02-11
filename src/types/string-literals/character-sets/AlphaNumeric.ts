import { IsStringLiteral } from "src/types/boolean-logic";
import { Alpha } from "./Alpha";
import { NumericChar } from "./NumericChar";

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
