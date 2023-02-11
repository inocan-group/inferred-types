import type { Keys, AnyObject } from "src/types";
import { isObject } from "src/runtime/type-guards/isObject";
import { isRef } from "src/runtime/type-guards/isRef";

/**
 * **keys**(obj)
 * 
 * Provides a read-only array of the _keys_ an object (or array) contains.
 * 
 * **Note:** this function is aware of Ref<T> types from VueJS and will return
 * `readonly ["value"]` as the keys array when detected rather than reporting
 * on props like `__v_isRef`, etc.
 */
export function keys<
  TObj extends AnyObject
>(obj: TObj): Keys<TObj> {
  return (
    isObject(obj)
      ? isRef(obj)
        ? ["value"]
        : Object.keys(obj)
      : [] as readonly []
  ) as Keys<TObj>;
}
