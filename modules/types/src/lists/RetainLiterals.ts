import type { Constant } from "inferred-types/constants";
import type { IsLiteral } from "../boolean-logic";
import type { If } from "../boolean-logic/branching/If";
import type { RemoveMarked } from "../containers";

type Process<
    T extends readonly unknown[],
> = RemoveMarked<{
    [K in keyof T]: If<
        IsLiteral<T[K]>,
        T[K],
        Constant<"Marked">
    >
}>;

/**
 * **RetainLiterals**`<T>`
 *
 * Receives a tuple of items and keeps only the literal types
 * (e.g., object, number, string, Record<string, string>, boolean, etc.).
 *
 * All literal types and elements such as _undefined_ and `null` are removed.
 *
 * **Related:** `Retain`, `FilterLiterals`, `RetainWideTypes`
 */
export type RetainLiterals<
    T extends readonly unknown[],
> = Process<T> extends readonly unknown[]
    ? Process<T>
    : never;
