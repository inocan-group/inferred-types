import { ObjectFromKv, TypeKvBase } from "src/types/type-conversion/ObjectFromKv";

export function kvToObject<KV extends readonly TypeKvBase<any, any>[]>(kvPairs: KV) {
  const obj: Record<string, any> = {};
  for (const kv of kvPairs) {
    const {key, value} = kv;
    obj[key] = value;
  }

  return obj as ObjectFromKv<KV>;
}
