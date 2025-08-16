import type { IsEqual } from "inferred-types/types";

/**
 * **IsWideBoolean**`<T>`
 *
 * Boolean operator which returns `true` when `T` is the wide `boolean` type.
 * Returns `false` for literal boolean values like `true` or `false`.
 */
export type IsWideBoolean<T> = IsEqual<T, boolean>;
