import type { IsEqual } from "inferred-types/types";

/**
 * **IsWideNumber**`<T>`
 *
 * Boolean operator which returns `true` when a _wide_ number
 * is passed in as `T`. It reports `false` on all other values
 * including _numeric literals_.
 */
export type IsWideNumber<T> = IsEqual<T, number>;
