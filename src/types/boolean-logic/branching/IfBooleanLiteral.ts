import { IsBooleanLiteral } from "src/types/index";

/**
 * **IfBooleanLiteral**
 *
 * Branch utility which returns:
 * - `IF` type when `T` is a boolean literal,
 * - and `ELSE` otherwise 
 * - the default value of `ELSE` is `T`
 */
export type IfBooleanLiteral<
  T,
  IF,
  ELSE = T
> = IsBooleanLiteral<T> extends true ? IF : ELSE;
