import type { IsUnion, RetainLiterals, UnionToTuple } from "inferred-types/types";

type Process<T> = UnionToTuple<T> extends readonly unknown[]
    ? RetainLiterals<UnionToTuple<T>>["length"] extends UnionToTuple<T>["length"]
        ? true
        : false
    : never;

/**
 * **IsLiteralUnion**`<T>`
 *
 * Boolean utility which checks whether `T` is both a _union type_
 * and that it's elements are all considered _literal type_.
 *
 * **Related:** `IsLiteralUnion`, `IsWideUnion`
 */
export type IsLiteralUnion<
    T,
> = [IsUnion<T>] extends [true]
    ? Process<T>
    : false;
