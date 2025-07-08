import { IsUnion, UnionFilter } from "inferred-types/types";


/**
 * **IsOk**`<T>`
 *
 * Ensures that `T` has all "error" types removed from it's type.
 *
 * - if `T` is part of a union, then error variants are removed
 * - if `T` is not a union it outputs `never` when T extends Error,
 * otherwise it just proxies `T` through.
 */
export type IsOk<T> = T extends any
    ? T extends Error
        ? never
        : T
    : never;

// Alternative implementation that preserves the original logic
// but may have issues in generic contexts:
export type IsOkOriginal<T> = IsUnion<T> extends true
    ? UnionFilter<T, Error>
    : T extends Error
    ? never
    : T;
