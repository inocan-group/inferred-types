
import type {
  AnyObject,
  If,
  Contains,
  Narrowable,
  SimplifyObject,
  Concat,
  ToString,
  Keys,
  ErrorCondition,
  AsRecord
} from "inferred-types/dist/types/index";

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
  K extends PropertyKey,
  V extends Narrowable
> = If<
  Contains<Keys<AsRecord<TObj>>, K>,
  ErrorCondition<"duplicate-key", Concat<["The object passed into AddKeyValue already has the key '", ToString<K>, "'. This is not allowed. If you intended this then consider using UpsertKeyValue instead."]>>,
  SimplifyObject<TObj & Record<K, V>>
>;

