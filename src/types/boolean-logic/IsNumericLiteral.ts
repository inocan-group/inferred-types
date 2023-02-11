import { Narrowable } from "../literals/Narrowable";

/**
 * **IsNumericLiteral**`<T>`
 *
 * Type utility which detects if the type `T` is a
 * numeric literal.
 */
export type IsNumericLiteral<T extends Narrowable> = number extends T ? false : true;
