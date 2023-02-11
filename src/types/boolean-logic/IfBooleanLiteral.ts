import { Narrowable } from "../literals/Narrowable";
import { IsBooleanLiteral } from "./IsBooleanLiteral";

/**
 * **IfBooleanLiteral**
 *
 * Branch utility which returns `TRUE` type when `T` is a boolean literal and `FALSE` otherwise
 */
export type IfBooleanLiteral<
  T extends boolean,
  TRUE extends Narrowable,
  FALSE extends Narrowable
> = IsBooleanLiteral<T> extends true ? TRUE : FALSE;
