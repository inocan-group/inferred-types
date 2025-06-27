import type { AsString } from "inferred-types/types";

/**
 * **Prepend**`<TStr, TPrepend>`
 *
 * Prepends the string `TPrepend` prior to existing `TStr` string.
 * ```ts
 * // "Bob, you're the best"
 * type T = Prepend<"you're the best", "Bob, ">;
 * ```
 *
 * **Related:** `Append`, `EnsureTrailing`
 */
export type Prepend<
    TStr extends string,
    TPrepend extends string | number | boolean,
> = TPrepend extends string
    ? `${TPrepend}${TStr}`
    : `${AsString<TPrepend>}${TStr}`;
