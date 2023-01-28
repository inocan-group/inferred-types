import { Narrowable, KvPair, KvToObject } from "../../types";
import { isKvPairArray } from "../type-guards/isKvPairArray";

/**
 * **kvToObject**(kv)
 * 
 * Converts a KV array to strongly typed object.
 * ```ts
 * // { foo: 1; bar: 2 }
 * const obj = kvToObject([
 *    { key: "foo", value: 1 },
 *    { key: "bar", value: 2 },
 * ])
 * ```
 */
export function kvToObject<
  K extends string, 
  V extends Narrowable, 
  KV extends readonly KvPair<K, V>[]
>(kvPairs: KV) {
  const obj: Record<string, any> = {};
  for (const kv of kvPairs) {
    const {key, value} = kv;
    obj[key] = isKvPairArray(value) ? kvToObject(value) : value;
  }

  return obj as KvToObject<KV>;
}
