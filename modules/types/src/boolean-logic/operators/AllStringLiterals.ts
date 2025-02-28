import type { And } from "../combinators/And";
import type { IsStringLiteral } from "./IsStringLiteral";

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
