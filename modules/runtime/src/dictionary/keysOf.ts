import type { Container, Keys } from "inferred-types/types";
import { isObject, isRef } from "inferred-types/runtime";

/**
 * **keysOf**(container)
 *
 * Provides a read-only array of the _keys_ an object (or array) contains.
 *
 * **Note:** this function is aware of Ref<T> types from VueJS and will return
 * `readonly ["value"]` as the keys array when detected rather than reporting
 * on props like `__v_isRef`, etc.
 */
export function keysOf<TContainer extends Container>(
  container: TContainer,
) {
  const keys: unknown = (
    Array.isArray(container)
      ? Object.keys(container).map(i => Number(i))
      : isObject(container)
        ? isRef(container)
          ? ["value"]
          : Object.keys(container)
        : []
  );
  return keys as Keys<TContainer>;
}
