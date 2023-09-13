import { IfNever, IfEqual, DoesExtend } from "../..";

/**
 * **IsNumericLiteral**`<T>`
 *
 * Type utility which detects if the type `T` is a
 * numeric literal.
 */
export type IsNumericLiteral<T> = IfNever<
  T, never, 
  DoesExtend<T, number> extends true 
    ? IfEqual<T, number, false, true> 
    : false
>;
