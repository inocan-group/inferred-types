import { KV } from "../base-types";
import { ExpandRecursively } from "../literals";
import { CreateKV } from "./CreateKV";

type BuildObj<
  T extends readonly string[] | KV | [KV],
  TType
> = T extends KV
? T
: T extends [KV]
? T[0]
: T extends string[]
? CreateKV<T,TType>
: never;


/**
 * **EnsureKeys**`<TObj,TKeys,[TType]`
 * 
 * Receives an object `TObj` and a specifier `TKeys` which
 * ensures that the specified _keys_ exist on the object. 
 * 
 * The _keys_ specifier may be either an array of keys or a dictionary of key/value pairs.
 * 
 * - when _keys_ is a _dictionary_ then both the key and _type_ of that key
 * are inferred.
 * - otherwise, the optional `TType` (set to `unknown` by default) is used.
 */
export type EnsureKeys<
  TObj extends object,
  TKeys extends readonly string[] | KV | [KV],
  TType = unknown
> = ExpandRecursively<
  TObj & BuildObj<TKeys, TType>
>

