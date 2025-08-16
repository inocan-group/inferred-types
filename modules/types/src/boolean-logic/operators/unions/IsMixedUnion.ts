import type {
    And,
    IsAny,
    IsLiteralUnion,
    IsNever,
    IsUnion,
    IsUnknown,
    IsWideUnion,
    Not
} from "inferred-types/types";

/**
 * **IsMixedUnion**`<T>`
 *
 * Test that `T` is:
 *
 * - a union type, AND
 * - some of the elements of the union are literal-like types
 * - some of the elements of the union are wide types
 *
 * Both `any` and `never` passed in as `T` result in a return of `false`
 * whereas a type of `unknown` will return `boolean`.
 *
 * **Related:** `IsLiteralUnion`, `IsNonLiteralUnion`, `IsWideUnion`
 */
export type IsMixedUnion<
    T
>
= [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : [IsUnknown<T>] extends [true]
            ? boolean
            : And<[
                IsUnion<T>,
                Not<IsLiteralUnion<T>>,
                Not<IsWideUnion<T>>,
            ]>;
