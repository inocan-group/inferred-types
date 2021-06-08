import { DictKv } from "~/types";

// TODO: this does not work correctly yet, needs to be fixed or removed

/**
 * Converts an array of `KeyValue` objects into
 * a dictionary object.
 */
export function kvToDictionary<KV extends DictKv<K, any>, K extends keyof KV, D extends { [U in keyof K]: any }>(kv: KV[]): D {
  const obj: any = {};

  for (const kvi of kv) {
    const { key, value } = kvi;
    obj[key] = value;
  }

  return obj as unknown as D;
}