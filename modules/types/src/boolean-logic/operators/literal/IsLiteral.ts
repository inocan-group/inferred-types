import type {
    IsBooleanLiteral,
    IsEmptyObject,
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
    IsObjectLiteral<T>,
    IsEmptyObject<T>
]>;

type IsUnitPrimitive<T> =
  [T] extends [null | undefined] ? true :
  T extends string ? (string extends T ? false : true) :
  T extends number ? (number extends T ? false : true) :
  T extends boolean ? (boolean extends T ? false : true) :
  T extends bigint ? (bigint extends T ? false : true) :
  T extends symbol ? true :
  false;

type A3 = IsUnitPrimitive<symbol>;

/**
 * **IsLiteral**`<T>`
 *
 * Boolean utility which returns `true` when `T` is a "literal".
 *
 * - a literal is any type which acts as a _discriminant_ which can not be narrowed further.
 *
 * **Note:** when `T` is a _union type_ this utility returns
 * `false` if any of the union members are a wide type
 *
 * **Related:** `IsUnion`, `IsWideUnion`, `IsLiteralUnion`
 */
export type IsLiteralLike<T> = [IsUnion<T>] extends [true]
    ? [IsLiteralUnion<T>] extends [true]
        ? true
        : false
    : Validations<T>;




