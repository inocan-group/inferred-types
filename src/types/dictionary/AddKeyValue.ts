import { ErrorCondition } from "src/runtime";
import { AnyObject } from "../base-types";
import { IfContains } from "../boolean-logic";
import { Narrowable } from "../literals";
import { SimplifyObject } from "./SimplifyObject";
import { Concat } from "../string-literals";
import { ToString } from "../type-conversion";
import { Key } from "./Key";
import { Keys } from "./Keys";

/**
 * **AddKeyValue**`<TObj,TKey,TVal>`
 * 
 * Extends the object `TObj` to include the new KV pair of `TKey`
 * and `TVal`. 
 * 
 * Any attempt to _override_ an existing key in `TObj` will result
 * in an **ErrorCondition< "duplicate-key" >**. Use the `UpsertKeyValue` utility if 
 * you want this condition to result in an overwrite.
 */
export type AddKeyValue<
  TObj extends AnyObject,
  K extends Key,
  V extends Narrowable
> = IfContains<
  Keys<TObj>, K, 
  ErrorCondition<"duplicate-key", Concat<["The object passed into AddKeyValue already has the key '", ToString<K>, "'. This is not allowed. If you intended this then consider using UpsertKeyValue instead."]>>,
  SimplifyObject<TObj & Record<K, V>>
>;

