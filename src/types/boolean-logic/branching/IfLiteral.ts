import { IsLiteral } from "src/types";

/**
 * **IfLiteral**
 *
 * Branch type utility with return `IF` when `T` is a _literal_ value and `ELSE` otherwise
 */
export type IfLiteral<
  T, 
  IF, 
  ELSE
> = IsLiteral<T> extends true
  ? IF
  : ELSE;
