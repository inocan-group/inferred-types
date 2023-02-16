import { AnyObject } from "../base-types";
import { IfContains } from "../boolean-logic";
import { Narrowable } from "../literals";
import { SimplifyObject } from "./SimplifyObject";
import { Key } from "./Key";
import { Keys } from "./Keys";

/**
 * **UpsertKeyValue**`<TObj,TKey,TVal>`
 * 
 * Updates the object `TObj` with the provided KV when keys overlap,
 * otherwise just adds the KV to `TObj`.
 * 
 * **Related:** `AddKeyValue`
 */
export type UpsertKeyValue<
  TObj extends AnyObject,
  K extends Key,
  V extends Narrowable
> = IfContains<
  Keys<TObj>, K, 
  SimplifyObject<Omit<TObj, K> & Record<K, V>>, 
  SimplifyObject<TObj & Record<K, V>>
>;
