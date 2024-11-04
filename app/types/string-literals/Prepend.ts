import { AsString } from "src/types/index";

/**
 * **Prepend**`<TStr, TPrepend>`
 *
 * Prepends the string `TPrepend` prior to existing `TStr` string.
 * ```ts
 * // "Bob, you're the best"
 * type T = Prepend<"you're the best", "Bob, ">;
 * ```
 *
 * **Related:** `EnsureLeading`
 */
export type Prepend<
  TStr extends string,
  TPrepend extends string | number | boolean
> = `${AsString<TPrepend>}${TStr}`;
