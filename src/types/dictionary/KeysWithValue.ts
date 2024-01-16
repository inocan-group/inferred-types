import { AfterFirst, AnyObject, ExplicitKeys, First, IfEmptyContainer } from "src/types";

type _process<
  TKeys extends readonly (string|symbol)[],
  TObj extends AnyObject,
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
 * The _keys_ on a given object `TObj` which extend the value 
 * of `TValue`.
 * 
 * ```ts
 * // ["foo",  "baz"]
 * type Str = KeysWithValue<{ foo: "hi"; bar: 5; baz: "bye" }, string>;
 * ```
 * 
 * **Related:** `KeysEqualValue`
 */
export type KeysWithValue<TObj extends AnyObject, TValue> = IfEmptyContainer<
  TObj,
   (string | symbol)[],
  _process<ExplicitKeys<TObj>, TObj, TValue>
>;
