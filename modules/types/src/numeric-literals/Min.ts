import type { AfterFirst, As, First, IsLessThan, Unset } from "inferred-types/types";

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
 * Provides the _maximum_ value provided in a numeric tuple.
 */
export type Min<
    T extends readonly number[],
> = Process<T>;
