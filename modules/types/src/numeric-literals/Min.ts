import type {
    AfterFirst,
    As,
    First,
    IsLessThan,
    IsUnion,
    UnionToTuple,
    Unset
} from "inferred-types/types";

type Process<
    T extends readonly number[],
    M extends number | Unset = Unset
> = [] extends T
    ? M extends Unset
        ? undefined
        : M
    : Process<
        AfterFirst<T>,
        M extends Unset
            ? First<T>
            : IsLessThan<First<T>, As<M, number>> extends true
                ? First<T>
                : M
    >;

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


