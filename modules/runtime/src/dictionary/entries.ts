import type { Narrowable, ObjectKey } from "inferred-types/types";
import { keysOf } from "inferred-types/runtime";

/**
 * **entries**
 *
 * Provides an _iterable_ over the passed in dictionary object where each iteration
 * provides a tuple of `[ key, value ]` which preserve type literals.
 *
 * For example:
 * ```ts
 * const obj = { foo: 1, bar: "hi" };
 * // k type is "foo" then "bar"; v type is 1 then "hi"
 * for (const [k, v] of entries(obj)) { ... }
 * ```
 */
export function entries<
  T extends Record<ObjectKey, N>,
  N extends Narrowable,
>(obj: T) {
  const iterable = {
    *[Symbol.iterator]() {
      for (const k of keysOf(obj)) {
        // const [k, v] = entry as KeyValue<T, First<typeof entry>>;
        type K = typeof k;
        yield ({ key: k, value: obj[k] }) as { key: K; value: K extends keyof T ? T[K] : never };
      }
    },
  };

  return iterable;
}
