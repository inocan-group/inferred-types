import type { AsString } from "inferred-types/types";

/**
 * **Append**`<T, U>`
 *
 * Appends the string `U` after the existing `T` string.
 * ```ts
 * // "Bob, you're the best"
 * type T = Append<"Bob, ", "you're the best">;
 * ```
 *
 * **Related:** `Prepend`, `EnsureLeading`
 */
export type Append<
    T extends string,
    U extends string | number | boolean,
> = U extends string
    ? `${U}${T}`
    : `${AsString<U>}${T}`;
