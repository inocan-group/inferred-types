import type {
    Container,
    Dictionary,
    IsWideObject,
} from "inferred-types/types";

/**
 * Efficiently filters tuples by removing never values using direct tail recursion
 */
type FilterTuple<
    T extends readonly unknown[],
    Result extends readonly unknown[] = []
>
    = T extends readonly [infer Head, ...infer Tail]
        ? [Head] extends [never]
            ? FilterTuple<Tail, Result>
            : FilterTuple<Tail, [...Result, Head]>
        : Result;

/**
 * Efficiently filters objects by removing never values using mapped types
 */
type FilterObject<T> = {
    [K in keyof T as [Required<T>[K]] extends [never] ? never : K]:
    T[K] extends Dictionary
        ? ProcessObject<T[K]>
        : T[K]
};

type ProcessObject<
    T extends Dictionary,
> = IsWideObject<T> extends true
    ? Dictionary
    : FilterObject<T>;

/**
 * **RemoveNever**`<T>`
 *
 * Removes all of the elements from `T` which are typed as _never_.
 *
 * Optimized implementation that avoids expensive UnionToTuple and NumericKeys operations.
 */
export type RemoveNever<
    T extends Container,
> = T extends readonly unknown[]
    ? FilterTuple<T>
    : T extends Dictionary
        ? ProcessObject<T>
        : never;
