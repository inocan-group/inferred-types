import type { AfterFirst, First, Something } from "inferred-types/types";

/**
 * **FirstValue**`<T>`
 *
 * Iterates over a tuple `T` and returns the first item in the
 * tuple which has a defined value (e.g., not _undefined_ nor _null_).
 *
 * **Related:** `FirstDefined`
 */
export type FirstValue<
    T extends any[],
    U = undefined
> = [] extends T
    ? U
    : First<T> extends Something
        ? First<T>
        : FirstValue<AfterFirst<T>, U>;
