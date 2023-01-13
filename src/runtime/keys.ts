import { Keys } from "src/types/Keys";
import { IntoSet, TupleFilter } from "src/types/lists";

/**
 * **keys**(obj)
 * 
 * Provides a read-only array of the _keys_ an object contains.
 */
export function keys<
  TObj extends Record<string, any>
>(obj: TObj) {
  return (
    Object
    .keys(obj)
  ) as Keys<TObj>
}

