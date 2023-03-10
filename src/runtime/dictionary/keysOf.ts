import type { IsRef, Keys, Or } from "src/types";
import {  isRef, isObject, isString, isTrue, isArray } from "src/runtime";

function keyFilter<
  TKeys extends readonly unknown[], 
  TOnlyString extends boolean | undefined
>(keys: TKeys, onlyStrings: TOnlyString) {
  return isTrue(onlyStrings)
    ? keys.filter(isString)
    : keys;
}

/**
 * **keysOf**(container)
 * 
 * Provides a read-only array of the _keys_ an object (or array) contains.
 * 
 * **Note:** this function is aware of Ref<T> types from VueJS and will return
 * `readonly ["value"]` as the keys array when detected rather than reporting
 * on props like `__v_isRef`, etc.
 */
export function keysOf<
  TContainer,
  TOnlyStrings extends boolean
>(
  container: TContainer, 
  onlyStrings: TOnlyStrings = false as TOnlyStrings
): Keys<TContainer, Or<[TOnlyStrings, IsRef<TContainer>]>> {
  return (
    isArray(container)
      ? Object.keys(container)
      : isObject(container)
      ? isRef(container)
        ? ["value"]
        : keyFilter(Object.keys(container), onlyStrings || isRef(container))
      : []
  ) as Keys<TContainer, Or<[TOnlyStrings, IsRef<TContainer>]>>;
}
