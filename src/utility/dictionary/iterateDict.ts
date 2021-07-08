import { KvTuple, Narrowable } from "~/types";

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
