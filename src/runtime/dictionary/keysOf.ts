import type {  AsRecord, Container,  IsRef,  Keys } from "src/types/index";
import { isObject, isRef } from "src/runtime/index";

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
  TContainer extends Container | object,
>(
  container: TContainer
): IsRef<TContainer> extends true ? readonly ["value"] : Keys<AsRecord<TContainer>> {

  return (
      Array.isArray(container)
        ? Object.keys(container).map(i => Number(i))
        : isObject(container)
          ? isRef(container)
            ? ["value"]
            : Object.keys(container)
          : []
  ) as unknown as IsRef<TContainer> extends true 
    ? readonly ["value"]
    : Keys<AsRecord<TContainer>>;
}
