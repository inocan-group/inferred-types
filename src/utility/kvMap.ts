import { kvDictArray } from "./kvDictArray";

export function kvMap<T extends NonNullable<{ [K in keyof T]: T[K] }>, K extends keyof T, KV extends Map<K, T[K]>>(obj: T): KV {
  const m = new Map();
  const kv = kvDictArray(obj);

  for (const kvi of kv) {
    m.set(kvi.key, kvi.value);
  }

  return m as KV;
}