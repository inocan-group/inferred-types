import type { AnyObject } from "src/base-types";
import type { AfterFirst, First } from "src/lists";
import type { ExpandDictionary } from "src/literals";

/**
 * **SetKeysTo**`<TObj, TKeys, TValue>`
 *
 * Mutates the type of `TObj` to have all keys specified in `TKeys` to by
 * typed to the value of `TValue`.
 */
export type SetKeysTo<
  TObj extends AnyObject,
  TKeys extends readonly string[],
  TValue,
> = [] extends TKeys
  ? ExpandDictionary<TObj>
  : SetKeysTo<
    TObj & Record<First<TKeys>, TValue>,
    AfterFirst<TKeys>,
    TValue
  >;
