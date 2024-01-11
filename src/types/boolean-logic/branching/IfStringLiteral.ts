import { IfNever, IsStringLiteral } from "src/types";

/**
 * **IfStringLiteral**
 *
 * Branch utility which returns `IF` type when `T` is a string 
 * literal and `ELSE` otherwise
 */
export type IfStringLiteral<
  T, 
  IF, 
  ELSE = T
> = IfNever<
  T,
  false,
  [IsStringLiteral<T>] extends [true]
  ? IF
  : ELSE
>;
