import type { IsNever } from "../operators";

/**
 * **WhenNever**`<T, [TMapTo]>`
 *
 * When `T` is _never_ this utility will map it to `TMapTo`; in all
 * other cases it just proxies `T` through.
 *
 * **Note:** if not specified, `TMapTo` will be set to **false**.
 */
export type WhenNever<
    T,
    TMapTo = false,
> = IsNever<T> extends true
    ? TMapTo
    : T;
