import { AfterFirst, First, IsDefined } from "inferred-types/types";

/**
 * **FirstDefined**`<T>`
 *
 * Iterates over a tuple `T` and returns the first item in the
 * tuple which has a defined value (e.g., not _undefined_).
 *
 * **Related:** `FirstValue`
 */
export type FirstDefined<
    T extends any[],
    U = undefined
> = [] extends T
? U
: IsDefined<First<T>> extends true
    ? First<T>
    : FirstDefined<AfterFirst<T>, U>;
