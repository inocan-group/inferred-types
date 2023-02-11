import { Narrowable } from "../literals/Narrowable";
import { IsNumericLiteral } from "./IsNumericLiteral";

/**
 * **IfNumericLiteral**`<T,IF,ELSE>`
 *
 * Branch utility which returns `IF` type when `T` is a numeric 
 * literal and `ELSE` in all other situations.
 */
export type IfNumericLiteral<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsNumericLiteral<T> extends true ? IF : ELSE;
