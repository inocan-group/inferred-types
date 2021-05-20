/**
 * **entries**
 *
 * Creates a strongly typed **Iterable** for an object where the iterable will yield
 * a strongly typed tuple of `[ K,V ]` for each interation.
 *
 * Example:
 * ```ts
 * const obj = { foo: 1, bar: "hi" };
 * for (const [k, v] of entries(obj)) { ... }
 * ```
 *
 * 👉 &nbsp;where `k` is a _string literal_ value (versus just a _string_)
 */
export function entries<T extends {}>(obj: T) {
  type K = keyof T;
  type KvTuple = [K, T[K]];
  const iterable: Iterable<KvTuple> = {
    *[Symbol.iterator]() {
      for (const [k, v] of Object.entries(obj)) {
        yield [k, v] as KvTuple;
      }
    },
  };

  return iterable;
}
