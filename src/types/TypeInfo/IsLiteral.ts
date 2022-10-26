import { IsBooleanLiteral } from "./IsBooleanLiteral";
import { IsStringLiteral } from "./IsStringLiteral";
import { IsNumericLiteral } from "./IsNumericLiteral";

/**
 * **IsLiteral**
 *
 * Type utility which returns true/false if the value passed -- a form of a
 * string, number, or boolean -- is a _literal_ value of that type (true) or
 * the more generic wide type (false).
 */
export type IsLiteral<T extends string | number | boolean> = T extends string
  ? IsStringLiteral<T>
  : T extends boolean
  ? IsBooleanLiteral<T>
  : T extends number
  ? IsNumericLiteral<T>
  : never;
