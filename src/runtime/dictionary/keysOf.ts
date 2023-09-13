import type {  Container,  IsRef,  Keys } from "../../types/base";
import { isObject, isReadonlyArray, isRef } from "src/runtime";

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
  TContainer extends Container,
>(
  container: TContainer
): IsRef<TContainer> extends true ? readonly ["value"] : Keys<TContainer> {

  return (
      isReadonlyArray(container)
        ? Object.keys(container).map(i => Number(i))
        : isObject(container)
          ? isRef(container)
            ? ["value"]
            : Object.keys(container)
          : []
  ) as unknown as IsRef<TContainer> extends true 
    ? readonly ["value"]
    : Keys<TContainer>;
}
