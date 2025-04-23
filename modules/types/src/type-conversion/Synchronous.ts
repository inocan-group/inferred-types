import type { Awaited, Thenable } from "inferred-types/types";

/**
 * **Synchronous**`<T>`
 *
 * Ensures that the value `T` is a _thenable_ `PromiseLike`
 * structure by converting non-`Thenable` values to
 * `Promise<T>`.
 *
 * **Related:** `Promised`, `Asynchronous`(alias), `Thenable`, `Awaited`
 */
export type Synchronous<T> = T extends Thenable
    ? Awaited<T>
    : T;
