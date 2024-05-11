import { 
  AfterFirst, 
  First, 
  IfEmptyContainer, 
  KV, 
  Keys, 
  ObjectKey 
} from "src/types/index";

type Process<
  TKeys extends readonly ObjectKey[],
  TObj extends KV,
  TValue,
  TResults extends readonly ObjectKey[] = []
> = [] extends TKeys
? TResults
: First<TKeys> extends keyof TObj 
  ? [TObj[First<TKeys>]] extends [TValue]
    ? Process<AfterFirst<TKeys>, TObj, TValue, [...TResults, First<TKeys>]>
    : Process<AfterFirst<TKeys>, TObj, TValue, TResults>
  : never;


/**
 * **KeysWithValue**`<TObj,TValue>`
 * 
 * Filter's the key/values found on `TObj` to only those whose
 * values _extend_ `TValue`.
 * 
 * ```ts
 * // ["foo",  "baz"]
 * type Str = KeysWithValue<{ foo: "hi"; bar: 5; baz: "bye" }, string>;
 * ```
 * 
 * **Related:** `KeysEqualValue`
 */
export type KeysWithValue<
  TObj extends KV,
  TValue
> = IfEmptyContainer<
  TObj,
  ObjectKey[],
  Process<Keys<TObj>, TObj, Readonly<TValue>>
>;
