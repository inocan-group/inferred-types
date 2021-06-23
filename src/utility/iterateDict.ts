import { KvTuple, Narrowable } from "~/types";

/**
 * **entries**
 *
 * Iterates over a dictionary object and produces a strongly typed 
 * tuple of `[ K,V ]` for each interation.
 *
 * Example:
 * ```ts
 * const obj = { foo: 1, bar: "hi" };
 * for (const [k, v] of entries(obj)) { ... }
 * ```
 *
 * 👉 &nbsp;where `k` is a _string literal_ value (versus just a _string_)
 */
export function iterateDict<N extends Narrowable, T extends Record<string, N>>(obj: T) {
  const iterable: Iterable<KvTuple<T, keyof T>> = {
    *[Symbol.iterator]() {
      for (const [k, v] of Object.entries(obj)) {
        yield [k, v] as KvTuple<T, typeof k>;
      }
    },
  };

  return iterable;
}
