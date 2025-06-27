import type { Thenable } from "inferred-types/types";

/**
 * **Promised**`<T>`
 *
 * Ensures that the value `T` is a _thenable_ `PromiseLike`
 * structure by converting non-`Thenable` values to
 * `Promise<T>`.
 *
 * **Related:** `Synchronous`, `Thenable`, `Awaited`
 */
export type Promised<T> = T extends Thenable
    ? T
    : Promise<T>;

/***
 * **Asynchronous**`<T>`
 *
 * - An alias for the `Promised<T>` type
 * - Ensures `T` is returned as a `PromiseLike` type
 *
 * **Related:** `Promised`, `Synchronous`, `Thenable`, `Awaited`
 */
export type Asynchronous<T> = Promised<T>;
