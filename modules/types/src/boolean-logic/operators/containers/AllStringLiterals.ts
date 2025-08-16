import type { And, IsStringLiteral } from "inferred-types/types";

/**
 * **AllStringLiterals**`<T>`
 *
 * Boolean operator which checks whether **all** of the
 * passed in elements are _string literals_.
 */
export type AllStringLiterals<
    T extends readonly unknown[],
> = And<{
    [K in keyof T]: IsStringLiteral<T[K]>
}>;
