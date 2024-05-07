import { And } from "../combinators/And";
import { IsNumericLiteral } from "./IsNumericLiteral";

/**
 * **AllNumericLiterals**`<T>`
 * 
 * Boolean operator which checks whether **all** of the
 * passed in elements are _numeric literals_.
 */
export type AllNumericLiterals<
  T extends readonly unknown[]
> = And<{
  [K in keyof T]: IsNumericLiteral<T[K]>
}>
