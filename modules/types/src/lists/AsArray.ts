import type { IsAny, IsNever, IsUndefined, IsUnknown, UnionToTuple } from "inferred-types/types";

/**
 * **AsArray**`<T>`
 *
 * Type utility which ensures that `T` is an array by:
 *
 * - encapsulating it as a single item array if it is a
 * non-array type (but not _undefined_).
 * - converting a union type into a tuple
 * - if `T` is undefined then it is converted to an empty array `[]`
 * - if `T` was already an array then it is just proxied through
 */
export type AsArray<T>
    = [IsAny<T>] extends [true]
        ? unknown[]
        : [IsNever<T>] extends [true]
            ? []
            : [IsUnknown<T>] extends [true]
                ? unknown[]
                : [T] extends [readonly unknown[]]
                    ? T
                    : [IsUndefined<T>] extends [true]
                        ? []
                        : UnionToTuple<T>;
