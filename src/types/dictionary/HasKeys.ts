import { KV, ObjectKey } from "../base-types";
import { AfterFirst, First } from "../lists";
import { ExpandRecursively } from "../literals";
import { AsRecord } from "../type-conversion/AsRecord";
import { Keys } from "./Keys";


type GetType<
  TKey extends ObjectKey,
  TObj extends Record<ObjectKey, unknown>,
  TKeys extends readonly string[] | Record<string, unknown> | [Record<string, unknown> ],
  TType
> =  TKeys extends [Record<TKey, unknown>]
? GetType<TKey,TObj,TKeys[0],TType>
: TKeys extends readonly string[]
? TKey extends keyof TObj
  ? TObj[TKey] : TType
: TKeys extends Record<TKey, unknown>
  ? TKey extends keyof TKeys
    ? TKeys[TKey]
    : TKey extends keyof TObj
      ? TObj[TKey] : never
      : TKey extends keyof TObj
        ? TObj[TKey] 
    : never;

type Process<
  TKeys extends readonly ObjectKey[],
  TObj extends Record<ObjectKey, unknown>,
  TSource extends readonly string[] | Record<string, unknown> | [Record<string, unknown> ],
  TType,
  TResult extends Record<ObjectKey, unknown> = NonNullable<unknown>
> = [] extends TKeys
? ExpandRecursively<TResult>
: Process<
    AfterFirst<TKeys>,
    TObj,
    TSource,
    TType,
    TResult & Record<
      First<TKeys>,
      GetType<First<TKeys>, TObj, TSource, TType>
    >
  >;

type GetKeys<
  T extends readonly string[] | Record<ObjectKey, unknown> | [Record<ObjectKey, unknown>]
> = T extends readonly string[]
? T
: T extends Record<ObjectKey, unknown> 
  ? Keys<T> extends readonly ObjectKey[]
    ? Keys<T>
    : never
  : T extends [Record<ObjectKey, unknown>]
      ? Keys<T[0]>
      : never;

/**
 * **HasKeys**`<TObj,TKeys,[TType]`
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
export type HasKeys<
  TObj,
  TKeys extends readonly string[] | KV | [KV],
  TType = unknown
> = TObj extends KV
? Process<
    Keys<AsRecord<TObj>> extends ObjectKey[]
    ? [...Keys<AsRecord<TObj>>, ...GetKeys<TKeys>]
    : never,
    TObj,
    TKeys,
    TType
  >
: TType;

