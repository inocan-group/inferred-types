import type { 

 IsStringLiteral,
 IsNumericLiteral,
 IsTuple,
 IsBooleanLiteral,
 IsObjectLiteral,
 IfEqual,
 Or,
} from "src/types/index";

type Validations<T> = Or<[
  IsStringLiteral<T>,
  IsNumericLiteral<T>,
  IsTuple<T>,
  IsBooleanLiteral<T>,
  IsObjectLiteral<T>,
]>;

/**
 * **IsLiteral**`<T>`
 *
 * Boolean utility which returns `true` when `T` is:
 * 
 * - string literal
 * - numeric literal
 * - boolean literal
 * - object literal
 * - or a tuple literal
 */
export type IsLiteral<T> = Validations<T>



//TODO: for reasons unknown we can't add in the `IsObjectLiteral<T>` test!

export type IsOptionalLiteral<T> = IfEqual<T, undefined, true, IsLiteral<T>>

