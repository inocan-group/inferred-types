import type { 
 IfEqual,
 Or,
 IsStringLiteral,
 IsNumericLiteral,
 IsTuple,
 IsBooleanLiteral,
 IsObjectLiteral,
 First,
 IsEqual,
 If,
 AfterFirst,
} from "src/types/index";



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
export type IsLiteral<T> = [
  IsStringLiteral<T>,
  IsNumericLiteral<T>,
  IsTuple<T>,
  IsBooleanLiteral<T>,
  IsObjectLiteral<T>,
];

// type x = IsLiteral<"foo"> ;



//TODO: for reasons unknown we can't add in the `IsObjectLiteral<T>` test!

// export type IsOptionalLiteral<T> = IfEqual<T, undefined, true, IsLiteral<T>>
