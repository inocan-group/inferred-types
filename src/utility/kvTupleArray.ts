import { KvTuple } from "../types/KeyValue";
import { Keys } from "./Keys";
import { kvDictArray } from "./kvDictArray";

/**
 * Converts a dictionary object into an array of `KeyValue` dictionaries
 * while maintaining narrow type definitions.
 */
export function kvTupleArray<T extends NonNullable<{}>, KV extends KvTuple<string[], any>>(obj: T): KV[] {

  const m = new Map();

  const kv = kvDictArray(obj);
  for (const kvi of kv) {
    m.set(kvi.key, kvi.value);
  }


  return Keys(obj).reduce((acc, key) => {
    // type Key = typeof obj[typeof key];
    const value: typeof obj[typeof key] = obj[key];
    const tuple = [key, value] as KvTuple<typeof key & string, typeof value>;
    return [...acc, tuple];
  }, [] as any[]) as KV[];
}

