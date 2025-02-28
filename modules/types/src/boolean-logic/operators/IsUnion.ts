import type { IsNever, UnionToTuple } from "inferred-types/types";

/**
 * **IsUnion**`<T>`
 *
 * Type utility which returns a boolean flag indicating whether the
 * given `T` is typed as a _union_ type.
 */
export type IsUnion<T> = [IsNever<UnionToTuple<T>>] extends [true]
    ? false
    : UnionToTuple<T> extends readonly unknown[]
        ? UnionToTuple<T>["length"] extends 1
            ? false
            : true
        : false;
