import {  IfNever, IsEqual } from "src/types/index";

/**
 * **IsStringLiteral**`<T>`
 *
 * Boolean type utility which detects whether `T` is 
 * a string literal.
 */
export type IsStringLiteral<T> = IfNever<
  T, 
  false,
  T extends string
  ? IsEqual<T,string> extends true 
    ? false
    : true
  : false
>;

