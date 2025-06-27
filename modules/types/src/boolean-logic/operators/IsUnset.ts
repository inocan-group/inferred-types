import type { IsEqual, Unset } from "inferred-types/types";

/**
 * **IsUnset**`<T>`
 *
 * Boolean operator which reports true/false on whether
 * `T` is the value `Unset`.
 */
export type IsUnset<T> = IsEqual<T, Unset>;

/**
 * **IsSet**`<T>`
 *
 * Boolean operator which reports true/false on whether
 * `T` is the value `Unset`.
 *
 * **Related:** `IsUnset`
 */
export type IsSet<T> = IsEqual<T, Unset>;
