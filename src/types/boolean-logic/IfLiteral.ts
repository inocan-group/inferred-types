import { Narrowable } from "../literals/Narrowable";
import { IsLiteral } from "./IsLiteral";

/**
 * **IfLiteral**
 *
 * Branch type utility with return `IF` when `T` is a _literal_ value and `ELSE` otherwise
 */
export type IfLiteral<
  T, 
  IF extends Narrowable, 
  ELSE extends Narrowable
> = IsLiteral<T> extends true
  ? IF
  : ELSE;
