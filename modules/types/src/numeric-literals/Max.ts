import type {
    IsGreaterThan,
    IsUnion,
    UnionToTuple,
    Unset
} from "inferred-types/types";

type Process<
    T extends readonly number[],
    M extends number | Unset = Unset
> = T extends [ infer Head extends number, ...infer Rest extends readonly number[]]
    ? M extends number
        ? IsGreaterThan<Head, M> extends true
            ? Process<Rest, Head>
            : Process<Rest, M>
    : Process<Rest,Head>
: M extends number ? M : undefined;
/**
 * **Max**`<T>`
 *
 * Provides the _maximum_ value provided in a numeric tuple.
 */
export type Max<
    T extends number | (readonly number[]),
> = [T] extends [number]
    ? [IsUnion<T>] extends [true]
        ? [UnionToTuple<T>] extends [readonly number[]]
            ? Max<UnionToTuple<T>>
            : never
        : T
: T extends readonly number[]
    ? Process<T>
    : never;
