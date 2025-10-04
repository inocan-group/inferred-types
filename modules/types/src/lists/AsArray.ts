import type { IsAny, IsNever, IsUndefined, IsUnknown, UnionToTuple } from "inferred-types/types";

// Helper to check if undefined is part of a union
type HasUndefined<T> = undefined extends T ? true : false;

// Helper to exclude undefined from a union
type ExcludeUndefined<T> = Exclude<T, undefined>;

// Distributive conditional type to handle each union member
type AsArrayDistributive<T> = T extends unknown
    ? [IsUndefined<T>] extends [true]
        ? []
        : [T] extends [readonly unknown[]]
            ? T
            : [T]
    : never;

/**
 * **AsArray**`<T>`
 *
 * Type utility which ensures that `T` is an array by:
 *
 * - encapsulating it as a single item array if it is a
 * non-array type (but not _undefined_).
 * - converting a union type into a tuple (unless it contains undefined)
 * - if `T` is undefined then it is converted to an empty array `[]`
 * - if `T` was already an array then it is just proxied through
 * - if `T` is a union containing undefined, it distributes over the union
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
                        : HasUndefined<T> extends true
                            ? AsArrayDistributive<T>
                            : UnionToTuple<T>;
