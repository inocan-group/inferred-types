import type { Constant } from "inferred-types/constants";
import type { IsWideType } from "../boolean-logic";
import type { If } from "../boolean-logic/branching/If";
import type { RemoveMarked } from "../containers";

type Process<
    T extends readonly unknown[],
> = RemoveMarked<{
    [K in keyof T]: If<
        IsWideType<T[K]>,
        T[K],
        Constant<"Marked">
    >
}>;

/**
 * **RetainWideTypes**`<T>`
 *
 * Receives a tuple of items and keeps only the "wide types"
 * (e.g., object literals, tuple literals, string literals,
 * numeric literals, and boolean literals).
 *
 * All wide types and elements such as _undefined_ and `null` are removed.
 *
 * **Related:** `Retain`, `RetainLiterals`, `FilterWideTypes`
 */
export type RetainWideTypes<
    T extends readonly unknown[],
> = Process<T> extends readonly unknown[]
    ? Process<T>
    : never;
