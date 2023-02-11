import { Narrowable } from "../literals/Narrowable";
import { IsStringLiteral } from "./IsStringLiteral";

/**
 * **IfStringLiteral**
 *
 * Branch utility which returns `IF` type when `T` is a string 
 * literal and `ELSE` otherwise
 */
export type IfStringLiteral<T extends Narrowable, IF extends Narrowable, ELSE extends Narrowable> = [
  IsStringLiteral<T>
] extends [true]
  ? IF
  : ELSE;
