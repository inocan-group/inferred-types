
import { IfContains , Narrowable , SimplifyObject , AnyObject, Keys } from "src/types/index";


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
  K extends PropertyKey,
  V extends Narrowable
> = IfContains<
  Keys<TObj>, K, 
  SimplifyObject<Omit<TObj, K> & Record<K, V>>, 
  SimplifyObject<TObj & Record<K, V>>
>;
