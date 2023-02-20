import { KvDictToObject } from "src/types/type-conversion/KvDictToObject";
import { Narrowable, KvDict } from "src/types";
import { isKvDictArray } from "../type-guards/isKvPairArray";

/**
 * **kvDictToObject**(kv)
 * 
 * Converts a KV array to strongly typed object.
 * ```ts
 * // { foo: 1; bar: 2 }
 * const obj = kvDictToObject([
 *    { key: "foo", value: 1 },
 *    { key: "bar", value: 2 },
 * ])
 * ```
 */
export function kvDictToObject<
  K extends string, 
  V extends Narrowable, 
  KV extends readonly KvDict<K, V>[]
>(kvPairs: KV) {
  const obj: Record<string, unknown> = {};
  for (const kv of kvPairs) {
    const {key, value} = kv;
    obj[key] = isKvDictArray(value) ? kvDictToObject(value) : value;
  }

  return obj as KvDictToObject<KV>;
}
