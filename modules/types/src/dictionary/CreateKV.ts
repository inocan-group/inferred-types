import type { EmptyObject } from "../base-types";
import type { Dictionary } from "../base-types/Dictionary";
import type { AfterFirst, First } from "../lists";
import type { ExpandRecursively } from "../literals";

type Process<
    TKeys extends readonly string[],
    TValue,
    TObj extends Dictionary = EmptyObject,
> = [] extends TKeys
    ? TObj
    : Process<
        AfterFirst<TKeys>,
        TValue,
    TObj & Record<First<TKeys>, TValue>
    >;

/**
 * **CreateKV**`<TKeys,[TValue]>`
 *
 * Creates a key value pair with the keys passed in
 * as `TKeys` and with all properties set to the value
 * of `TValue` (which defaults to `unknown`)
 */
export type CreateKV<
    TKeys extends readonly string[],
    TValue = unknown,
> = ExpandRecursively<
    Process<TKeys, TValue>
>;
