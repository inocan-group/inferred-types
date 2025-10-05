import type {
    IsLessThan,
    IsUnion,
    UnionToTuple,
    Unset
} from "inferred-types/types";

type Process<
    T extends readonly number[],
    M extends number | Unset = Unset
> = T extends [ infer Head extends number, ...infer Rest extends readonly number[]]
    ? M extends number
        ? IsLessThan<Head, M> extends true
            ? Process<Rest, Head>
            : Process<Rest, M>
        : Process<Rest, Head>
    : M extends number ? M : undefined;

/**
 * **Min**`<T>`
 *
 * Provides the _maximum_ value provided in a numeric array
 * or union.
 *
 * ```ts
 * // 1
 * type Arr = Min<[1,2,3]>;
 * // 1
 * type Arr = Min<1|2|3>;
 * ```
 *
 * **Related:** `Max`, `Sum`
 */
export type Min<
    T extends number | (readonly number[]),
> = [T] extends [number]
    ? [IsUnion<T>] extends [true]
        ? [UnionToTuple<T>] extends [readonly number[]]
            ? Min<UnionToTuple<T>>
            : never
        : T
    : T extends readonly number[]
        ? Process<T>
        : never;
