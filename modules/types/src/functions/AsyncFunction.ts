import type { If, IsThenable } from "inferred-types/types";

/**
 * **AsyncFunction**`<[TParams], [TReturns]>`
 *
 * By default, represents the type of _any_ Asynchronous function
 * which returns a Promise (or _promise-like_) API surface.
 *
 * Provides generics to narrow the scope of the type if desired.
 *
 * **Related:** `Awaited`, `IsThenable`
 */
export type AsyncFunction<
    TParams extends readonly unknown[] = readonly unknown[],
    TReturns = unknown,
> = (...params: TParams) => If<
    IsThenable<TReturns>,
    TReturns,
    Promise<TReturns>
>;
