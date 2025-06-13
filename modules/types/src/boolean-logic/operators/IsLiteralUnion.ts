import type { And, IsFalse, IsNull, IsNumericLiteral, IsObjectLiteral, IsStringLiteral, IsTrue, IsTuple, IsUndefined, IsUnion, UnionToTuple } from "inferred-types/types";

type Process<
    T extends readonly unknown[]
> = And<{
    [K in keyof T]: IsStringLiteral<T[K]> extends true
        ? true
        : IsNumericLiteral<T[K]> extends true
            ? true
            : IsNull<T[K]> extends true
                ? true
                : IsUndefined<T[K]> extends true
                    ? true
                    : IsObjectLiteral<T[K]> extends true
                        ? true
                        : IsTuple<T[K]> extends true
                            ? true
                            : IsTrue<T[K]> extends true
                                ? true
                                : IsFalse<T[K]> extends true
                                    ? true
                                    : false
}>;

/**
 * **IsLiteralUnion**`<T>`
 *
 * Boolean utility which checks whether `T` is both a _union type_
 * and that it's elements are all considered a _literal type_.
 *
 * **Related:** `IsLiteralUnion`, `IsWideUnion`
 */
export type IsLiteralUnion<T> = [IsUnion<T>] extends [true]
    ? Process<UnionToTuple<T>>
    : false;
