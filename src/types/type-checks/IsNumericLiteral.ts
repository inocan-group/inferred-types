/**
 * **IsNumericLiteral**
 *
 * Type utility which returns true/false if the numeric value a _numeric literal_ versus
 * just the _number_ type.
 */
export type IsNumericLiteral<T extends number> = number extends T ? false : true;

/**
 * **IfNumericLiteral**
 *
 * Branch utility which returns `IF` type when `T` is a numeric literal and `ELSE` otherwise
 */
export type IfNumericLiteral<T extends number, IF, ELSE> = IsNumericLiteral<T> extends true
  ? IF
  : ELSE;
