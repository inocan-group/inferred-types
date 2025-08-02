import type { Dictionary, IsLiteralLikeObject, IsTuple, IsUnion, TupleToUnion } from "inferred-types/types";

type MutableObject<T> = [T] extends [boolean]
    ? T
    : {
        -readonly [K in keyof T]: T[K] extends Dictionary
            ? MutableObject<T[K]>
            : IsTuple<T[K]> extends true
                ? T[K]
                : T[K] extends readonly (infer R)[]
                    ? R[]
                    : T[K];
    };

type MutableArray<T extends readonly unknown[]> = [...{

    [K in keyof T]: Mutable<T[K]>
}];

/**
 * **Mutable**`<T>`
 *
 * Makes a readonly value to a mutable value without
 * widening the type.
 */
export type Mutable<T> =
[IsUnion<T>] extends [true]
? [T]
: [T] extends [readonly unknown[]]
    ? MutableArray<T>
    : [IsLiteralLikeObject<T>] extends [true]
        ? MutableObject<T>
        : T;
