import { IfNever } from "../..";

/**
 * **IsStringLiteral**`<T>`
 *
 * Boolean type utility which detects whether `T` is 
 * a string literal.
 */
export type IsStringLiteral<T> = IfNever<T, never,
[T] extends [string]
  ? string extends T
    ? false
    : true
  : false
>;
