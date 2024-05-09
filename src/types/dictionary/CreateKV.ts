import { EmptyObject } from "../base-types";
import { KV } from "../base-types/KV";
import { AfterFirst, First } from "../lists"
import { ExpandRecursively } from "../literals";

type Process<
TKeys extends readonly string[],
TValue,
TObj extends KV = EmptyObject
>= [] extends TKeys
? TObj
: Process<
    AfterFirst<TKeys>,
    TValue,
    TObj & Record<First<TKeys>,TValue>
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
  TValue = unknown
> = ExpandRecursively<
  Process<TKeys,TValue>
>
