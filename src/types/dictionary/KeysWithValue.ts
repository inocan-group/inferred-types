import { AfterFirst,  First, IfEmptyContainer, KV, Keys, ObjectKey } from "src/types/index";

type _process<
  TKeys extends readonly PropertyKey[],
  TObj extends KV,
  TValue,
  TResults extends readonly (string|symbol)[] = []
> = [] extends TKeys
? TResults
: First<TKeys> extends keyof TObj 
  ? TObj[First<TKeys>] extends TValue
    ? _process<AfterFirst<TKeys>, TObj, TValue, [...TResults, First<TKeys>]>
    : _process<AfterFirst<TKeys>, TObj, TValue, TResults>
  : _process<AfterFirst<TKeys>, TObj, TValue, TResults>;

/**
 * **KeysWithValue**`<TObj,TValue>`
 * 
 * The _keys_ on a given object `TObj` which _extend_ the value 
 * of `TValue`.
 * 
 * ```ts
 * // ["foo",  "baz"]
 * type Str = KeysWithValue<{ foo: "hi"; bar: 5; baz: "bye" }, string>;
 * ```
 * 
 * **Related:** `KeysEqualValue`
 */
export type KeysWithValue<
  TObj extends Record<ObjectKey, unknown>,
  TValue
> = IfEmptyContainer<
  TObj,
   (string | symbol)[],
  _process<Keys<TObj>, TObj, TValue>
>;
