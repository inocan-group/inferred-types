import type { AnyFunction, IsAny, IsNever } from "inferred-types/types";

/**
 * **IsFunction**`<T>`
 *
 * Checks whether `T` is a function of _any_ kind and that includes
 * functions with dictionary props sitting alongside the function.
 *
 * **Related:**
 * - `IsNarrowingFn`, `IsStaticFn`
 * - `IsLiteralFunction`, `IsLiteralLikeFunction`, `IsWideFn`
 */
export type IsFunction<T>
= [IsAny<T>] extends [true] ? false
    : [IsNever<T>] extends [true] ? false
        : T extends undefined
            ? false
            : [T] extends [AnyFunction]
                ? true
                : false;
