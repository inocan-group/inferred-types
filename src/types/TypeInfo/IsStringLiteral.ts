/**
 * **IsStringLiteral**
 *
 * Type utility which returns true/false if the string a _string literal_ versus
 * just the _string_ type.
 */
export type IsStringLiteral<T extends string> = string extends T ? false : true;

/**
 * **IfStringLiteral**
 *
 * Branch utility which returns `IF` type when `T` is a string literal and `ELSE` otherwise
 */
export type IfStringLiteral<T extends string, IF, ELSE> = IsStringLiteral<T> extends true
  ? IF
  : ELSE;
