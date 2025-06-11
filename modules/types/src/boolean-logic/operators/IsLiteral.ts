import type {
    IfEqual,
    IsBooleanLiteral,
    IsLiteralUnion,
    IsNumericLiteral,
    IsObjectLiteral,
    IsStringLiteral,
    IsTuple,
    IsUnion,
    Or,
} from "inferred-types/types";

type Validations<T> = Or<[
    IsStringLiteral<T>,
    IsNumericLiteral<T>,
    IsTuple<T>,
    IsBooleanLiteral<T>,
    IsObjectLiteral<T>
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
 *
 * Note: when `T` is a _union type_ this utilty returns `false` if
 * any of the union members are a wide type
 *
 * **Related:** `IsUnion`, `IsWideUnion`, `IsLiteralUnion`
 */
export type IsLiteral<T> = [IsUnion<T>] extends [true]
    ? [IsLiteralUnion<T>] extends [true]
        ? true
        : false
    : Validations<T>;


export type IsOptionalLiteral<T> = IfEqual<T, undefined, true, IsLiteral<T>>;

