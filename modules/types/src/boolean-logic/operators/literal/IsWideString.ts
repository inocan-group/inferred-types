import type { IsEqual } from "../compare/IsEqual";

/**
 * **IsWideString**`<T>`
 *
 * Boolean operator which returns `true` when a _wide_ string
 * is passed in as `T`. It reports `false` on all other values
 * including _literal strings_.
 */
export type IsWideString<T> = IsEqual<T, string>;
