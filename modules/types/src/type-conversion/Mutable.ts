import type { Dictionary, IsTuple, IsUnion } from "inferred-types/types";

type MutableObject<T> = [T] extends [boolean]
    ? T
    : {
        -readonly [K in keyof T]: T[K] extends Dictionary
            ? Mutable<MutableObject<T[K]>>
            : IsTuple<T[K]> extends true
                ? Mutable<T[K]>
                : T[K] extends readonly (infer R)[]
                    ? [...R[]]
                    : Mutable<T[K]>;
    };

type MutableArray<T extends readonly unknown[]> = [...{
    [K in keyof T]: Mutable<T[K]>
}];

/**
 * **Mutable**`<T>`
 *
 * Makes a readonly type -- either a dictionary or an array -- into a mutable value without
 * widening the type.
 */
export type Mutable<T>
    = [IsUnion<T>] extends [true]
        ? T
        : [T] extends [infer Arr extends readonly unknown[]]
            ? MutableArray<Arr>
            : [T] extends [infer Dict extends Dictionary]
                ? MutableObject<Dict>
                : T;
