import type { AnyFunction } from "inferred-types/types";

/**
 * **IsFunction**`<T>`
 *
 * Checks whether `T` is a function of _any_ kind and that includes
 * functions with dictionary props sitting alongside the function.
 */
export type IsFunction<T> = T extends null
    ? false
    : T extends undefined
        ? false
        : [T] extends [AnyFunction] ? true : false;
