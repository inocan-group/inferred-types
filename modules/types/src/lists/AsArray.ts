import type { IsUndefined, IsUnion, Mutable, UnionToTuple } from "inferred-types/types";

type TupleToArray<
    T extends readonly unknown[]
> = {
    [K in keyof T]: T[K] extends any[]
        ? T[K]
        : T[K][]
}[number] extends any[]
    ? {
        [K in keyof T]: T[K] extends any[]
            ? T[K]
            : T[K][]
    }[number]
    : never;

/**
 * **AsArray**`<T>`
 *
 * Type utility which ensures that `T` is an array by
 * encapsulating it as a single item array if it is a
 * non-array type.
 *
 * - if `T` is undefined then it is converted to an empty array `[]`
 */
export type AsArray<T> = [IsUnion<T>] extends [true]
    ? TupleToArray<Mutable<UnionToTuple<T>>>
    : [T] extends [ any[]]
        ? Mutable<T>
        : [IsUndefined<T>] extends [true]
            ? []
            : [Mutable<T>];
