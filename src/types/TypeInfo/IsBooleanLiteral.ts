/**
 * **IsBooleanLiteral**
 *
 * Type utility which returns true/false if the boolean value is a _boolean literal_ versus
 * just the wider _boolean_ type.
 */
export type IsBooleanLiteral<T extends boolean> = boolean extends T ? false : true;

/**
 * **IfBooleanLiteral**
 *
 * Branch utility which returns `IF` type when `T` is a boolean literal and `ELSE` otherwise
 */
export type IfBooleanLiteral<T extends boolean, IF, ELSE> = IsBooleanLiteral<T> extends true
  ? IF
  : ELSE;
