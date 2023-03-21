import type {  AnyObject, IsRef, Keys, Tuple } from "src/types";
import {  isRef, isObject, isString, isTrue, isReadonlyArray } from "src/runtime";

function keyFilter<
  TKeys extends readonly unknown[], 
  TOnlyString extends boolean | undefined
>(keys: TKeys, onlyStrings: TOnlyString) {
  return isTrue(onlyStrings)
    ? keys.filter(isString)
    : keys;
}

type ReturnValue<
  TContainer extends readonly PropertyKey[],
  TOnlyStrings extends boolean
> = Keys<
  TContainer, 
  TOnlyStrings extends true 
    ? true
    : IsRef<TContainer> extends true
      ? true
      : false
>;

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
  TContainer extends AnyObject | Tuple,
  TOnlyStrings extends boolean
>(
  container: TContainer,
  onlyStrings: TOnlyStrings = false as TOnlyStrings
) {
  return (
    isReadonlyArray(container)
      ? Object.keys(container).map(i => Number(i) )as number[]
      : isObject(container)
        ? isRef(container)
          ? ["value"]
          : keyFilter(
              Object.keys(container), 
              (isRef(container) ? true : onlyStrings) as TOnlyStrings
            )
        : []
  ) as ReturnValue<Keys<TContainer>, TOnlyStrings>;
}
