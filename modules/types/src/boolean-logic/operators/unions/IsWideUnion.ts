import type { And, IsUnion, UnionToTuple, IsWideType } from "inferred-types/types";

type Check<
    T extends readonly unknown[]
> = And<{
    [K in keyof T]: IsWideType<T[K]>
}>;

/**
 * **IsWideUnion**`<T>`
 *
 * Checks whether `T` is a union whose elements are all considered "wide" types.
 *
 * **Related:** `IsLiteralUnion`, `IsMixedUnion`
 */
export type IsWideUnion<T> = IsUnion<T> extends true
    ? Check<UnionToTuple<T>>
    : false;
