/**
 * **IsNumericLiteral**`<T>`
 *
 * Type utility which detects if the type `T` is a
 * numeric literal.
 */
export type IsNumericLiteral<T> = number extends T ? false : true;
