import type { IsAny, IsEqual, IsNever, Length, TypedFunction } from "inferred-types/types";

/**
 * **HasParameters**`<T>`
 *
 * Type utility which detects if `T` is both a function and whether that
 * function has _at least_ one type parameter.
 * ```ts
 * const fn = (foo: string) => `${foo}bar`;
 * // true
 * type P = HasParameters<typeof fn>;
 * ```
 */
export type HasParameters<T>
= [IsAny<T>] extends [true] ? false
    : [IsNever<T>] extends [true] ? false
        : T extends TypedFunction
            ? IsEqual<Length<Parameters<T>>, 0> extends true
                ? false
                : true
            : false;
