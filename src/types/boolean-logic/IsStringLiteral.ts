
/**
 * **IsStringLiteral**`<T>`
 *
 * Boolean type utility which detects whether `T` is 
 * a string literal.
 */
export type IsStringLiteral<T> = [T] extends [string]
  ? string extends T
    ? false
    : true
  : false;
