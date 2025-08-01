import type { IsAny, IsEqual, IsNever, Length, TypedFunction } from "inferred-types/types";

/**
 * **HasNoParameters**`<T>`
 *
 * Type utility which detects if `T` is both a function and has _no_ parameters in
 * it's signature.
 *
 * ```ts
 * const fn = (foo: string) => `${foo}bar`;
 * // true
 * type P = HasParameters<typeof fn>;
 * ```
 */
export type HasNoParameters<T>
= [IsAny<T>] extends [true] ? false
    : [IsNever<T>] extends [true] ? false
        : T extends TypedFunction
            ? IsEqual<Length<Parameters<T>>, 0> extends true
                ? true
                : false
            : false;
