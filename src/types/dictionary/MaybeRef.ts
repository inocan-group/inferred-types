import { VueRef } from "inferred-types/types";

/**
 * **MaybeRef**`<T>`
 *
 * Used to represent a type which is either of the two:
 *
 * - `T`
 * - `VueRef<T>`
 *
 * **Related:** `IsRef`, `IfRef`
 * ```ts
 * // number | VueRef<number>
 * type T = MaybeRef<number>;
 * ```
 */
export type MaybeRef<T> = T | VueRef<T>;
