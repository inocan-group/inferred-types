import { IntoSet, Length, Mutable } from "src/types";
import { Narrowable } from "types/literals/Narrowable";


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
export function narrow<T extends readonly Narrowable[]>(...values: T) {
  return (
    values.length === 1 
      ? values[0] 
      : values
  ) as Length<T> extends 1 
    ? T[0] extends readonly any[]
      ? T[0]
      : Mutable<T[0]> 
    : IntoSet<T>;
}
