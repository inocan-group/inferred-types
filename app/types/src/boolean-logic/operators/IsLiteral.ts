import type {
 IsStringLiteral,
 IsNumericLiteral,
 IsTuple,
 IsBooleanLiteral,
 IsObjectLiteral,
 IfEqual,
 IsUnion,
} from "@inferred-types/types";

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
 *
 * Note: when `T` is a _union type_, even if there are literal types
 * in the union, this will return `false`.
 *
 * **Related:** `IsUnion`, `IsWideUnion`, `IsLiteralUnion`
 */
export type IsLiteral<T> = [IsUnion<T>] extends [true]
? false
: Validations<T>



//TODO: for reasons unknown we can't add in the `IsObjectLiteral<T>` test!

export type IsOptionalLiteral<T> = IfEqual<T, undefined, true, IsLiteral<T>>

