import { IsStringLiteral } from "src/types/boolean-logic";

/**
 * **IfStringLiteral**
 *
 * Branch utility which returns `IF` type when `T` is a string 
 * literal and `ELSE` otherwise
 */
export type IfStringLiteral<T, IF, ELSE> = [IsStringLiteral<T>] extends [true]
  ? IF
  : ELSE;
