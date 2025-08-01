import type { MARKED } from "inferred-types/constants";
import type {
    Container,
    Dictionary,
} from "inferred-types/types";

type Marked = typeof MARKED;

/**
 * Efficiently filters tuples by removing never values using direct tail recursion
 */
type FilterTuple<T extends readonly unknown[], Result extends readonly unknown[] = []>
    = T extends readonly [infer Head, ...infer Tail]
        ? [Head] extends [Marked]
            ? FilterTuple<Tail, Result>
            : FilterTuple<Tail, [...Result, Head]>
        : Result;

/**
 * Efficiently filters objects by removing never values using mapped types
 */
type FilterObject<T> = {
    [K in keyof T as [T[K]] extends [Marked] ? never : K]: T[K]
};

/**
 * **RemoveMarked**`<T>`
 *
 * Removes all values in `T` which extends `Constant<"Marked">`
 */
export type RemoveMarked<
    T extends Container,
> = T extends readonly unknown[]
    ? FilterTuple<T>
    : T extends Dictionary
        ? FilterObject<T>
        : never;
