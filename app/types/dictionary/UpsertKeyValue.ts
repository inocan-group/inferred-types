
import {   
  AnyObject, 
  ExpandRecursively, 
  ObjectKey, 
} from "src/types/index";


type Process<  
TObj extends AnyObject,
K extends ObjectKey,
V
> = K extends keyof TObj
? Omit<TObj, K> & Record<K,V>
: TObj & Record<K,V>;

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
  K extends ObjectKey,
  V
> = ExpandRecursively<Process<TObj, K, V>>;
