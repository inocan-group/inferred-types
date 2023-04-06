import { Narrowable , KvDict } from "src/types";
import { isKvPair } from "src/runtime";

/**
 * **isKvDictArray**(value)
 * 
 * Type guard used to check whether value is an array of `KvDict` entries.
 */
export function isKvDictArray<
  K extends string, 
  V extends Narrowable, 
  T extends KvDict<K,V>[]
>(value: unknown | T): value is T {
  return Array.isArray(value) && (value as unknown[]).every(v => isKvPair(v));
}
