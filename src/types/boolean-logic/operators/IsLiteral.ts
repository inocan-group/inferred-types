import type { 
 IsStringLiteral,
 IsNumericLiteral,
 IsTuple,
 IsBooleanLiteral,
 IsObjectLiteral,
 IfEqual,
} from "src/types/index";

type Validations<T> = IsStringLiteral<T> extends true
? true
: IsNumericLiteral<T> extends true
? true
: IsTuple<T> extends true
? true
: IsBooleanLiteral<T> extends true
? true
: IsObjectLiteral<T> extends true
? true
: false;

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

