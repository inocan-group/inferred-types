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

type Process<T> = [IsUnion<T>] extends [true]
    ? Mutable<TupleToArray<
        UnionToTuple<T>
    >>
    : [T] extends [ any[]]
        ? Mutable<T>
        : [IsUndefined<T>] extends [true]
            ? []
            : [Mutable<T>];

/**
 * **AsArray**`<T>`
 *
 * Type utility which ensures that `T` is an array by:
 *
 * - encapsulating it as a single item array if it is a
 * non-array type.
 * - converting a union type into a tuple
 * - if `T` is undefined then it is converted to an empty array `[]`
 * - if `T` was already an array then it is just proxied through
 */
export type AsArray<T> = Process<T> extends readonly any[]
    ? Process<T>
    : never;
