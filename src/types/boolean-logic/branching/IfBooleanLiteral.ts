import { IsBooleanLiteral } from "src/types/index";

/**
 * **IfBooleanLiteral**
 *
 * Branch utility which returns `TRUE` type when `T` is a boolean literal and `FALSE` otherwise
 */
export type IfBooleanLiteral<
  T extends boolean,
  TRUE,
  FALSE
> = IsBooleanLiteral<T> extends true ? TRUE : FALSE;
