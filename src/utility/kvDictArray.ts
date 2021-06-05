import { KvDict } from "../types/key-value";
import { Keys } from "./Keys";

/**
 * Converts a dictionary object into an array of `KeyValue` dictionaries
 * while maintaining narrow type definitions.
 */
export function kvDictArray<T extends {}>(obj: T): KvDict<T>[] {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Value passed into kv() must be an object");
  }

  return Keys(obj).reduce((acc, key) => {
    const value = obj[key];
    return [...acc, { key, value }];
  }, [] as KvDict<T>[]);
}