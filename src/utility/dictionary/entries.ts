import { KeyValue, Narrowable } from "~/types";
import { keys } from "../keys";

/**
 * **entries**
 *
 * Provides an _interable_ over the passed in dictionary object where each iteration 
 * provides a tuple of `[ key, value ]` which preserve type literals.
 *
 * For example:
 * ```ts
 * const obj = { foo: 1, bar: "hi" };
 * // k type is "foo" then "bar"; v type is 1 then "hi"
 * for (const [k, v] of entries(obj)) { ... }
 * ```
 */
export function entries<N extends Narrowable, T extends Record<string, N>, I extends KeyValue<T, keyof T>>(obj: T) {

  const iterable = {
    *[Symbol.iterator]() {
      for (const k of keys(obj)) {
        // const [k, v] = entry as KeyValue<T, First<typeof entry>>;
        yield [k, obj[k]] as KeyValue<T, typeof k> as I;
      }
    },
  };

  return iterable;
}