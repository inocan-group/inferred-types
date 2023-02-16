import { IsNumericLiteral } from "./IsNumericLiteral";

/**
 * **IfNumericLiteral**`<T,IF,ELSE>`
 *
 * Branch utility which returns `IF` type when `T` is a numeric 
 * literal and `ELSE` in all other situations.
 */
export type IfNumericLiteral<
  T,
  IF,
  ELSE
> = IsNumericLiteral<T> extends true ? IF : ELSE;
