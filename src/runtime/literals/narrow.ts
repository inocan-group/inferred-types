import { Length, Mutable } from "src/types";
import { Narrowable } from "src/types/Narrowable";


/**
 * **narrow**(value)
 * 
 * An identity function which provides the input in as narrow a form
 * as possible.
 * ```ts
 * const s = narrow("foo"); // "foo"
 * const n = narrow(42); // 42
 * // ["foo", "bar"]
 * const t1 = narrow(["foo", "bar"] as const);
 * const t2 = narrow("foo", "bar");
 * // string`[]
 * const t3 = narrow(["foo", "bar"]);
 * ```
 */
export function narrow<T extends Narrowable[]>(...values: T) {
  return (
    values.length === 1 
      ? values[0] 
      : values
  ) as Length<T> extends 1 ? Mutable<T[0]> : T;
}


