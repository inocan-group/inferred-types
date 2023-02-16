import type { Keys, AnyObject, IsRef } from "src/types";
import {  isRef, isObject, isString, isTrue } from "../type-guards";

function keyFilter<
  TKeys extends readonly unknown[], 
  TOnlyString extends boolean | undefined
>(keys: TKeys, onlyStrings: TOnlyString) {
  return isTrue(onlyStrings)
    ? keys.filter(isString)
    : keys;
}

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
  TObj extends AnyObject,
  TOnlyStrings extends boolean = false
>(obj: TObj, onlyStrings?: TOnlyStrings): Keys<TObj, IsRef<TObj>> {
  return (
    isObject(obj)
      ? isRef(obj)
        ? ["value"]
        : keyFilter(Object.keys(obj), onlyStrings)
      : [] as readonly []
  ) as Keys<TObj, IsRef<TObj>>;
}
