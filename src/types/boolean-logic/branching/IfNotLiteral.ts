import { IsLiteral } from "src/types/index";

/**
 * **IfLiteral**
 *
 * Branch type utility with return `IF` when `T` is a _literal_ value and `ELSE` otherwise
 */
export type IfNotLiteral<
  T, 
  IF, 
  ELSE
> = IsLiteral<T> extends false
  ? IF
  : ELSE;
