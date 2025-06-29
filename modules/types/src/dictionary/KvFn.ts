import type { FnDefn, FnWithDescription } from "../functions/FnWithDescription";

/**
 * **KvFnDefn**
 *
 * Used as input to the `KvFn<T>` utility.
 */
export type KvFnDefn = [key: string, fn: FnDefn];

/**
 * **KvFn**`<TKey,TArgs,TReturn,[TProps]>`
 *
 * A succinct and strong type definition for a KV value pair where the
 * _value_ is a function.
 */
export type KvFn<
    T extends KvFnDefn = KvFnDefn,
> = Record<T[0], FnWithDescription<T[1]>>;
