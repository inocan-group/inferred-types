import type { IsThenable } from "inferred-types/types";

/**
 * **SyncFunction**`<[TParams], [TReturns]>`
 *
 * By default, represents the type of _any_ Asynchronous function
 * which returns a Promise (or _promise-like_) API surface.
 *
 * Provides generics to narrow the scope of the type if desired.
 *
 * **Related:**
 * - `AsyncFunction`
 * - `Awaited`, `IsThenable`
 */
export type SyncFunction<
  TParams extends readonly unknown[] = readonly unknown[],
  TReturns = unknown,
> = IsThenable<TReturns> extends true
  ? never
  : (...params: TParams) => TReturns;
