import { DictKv } from "~/types";
import { keys } from "./Keys";

function pickValue<T extends NonNullable<object>, K extends keyof T>(key: K, obj: T) {
  return obj[key] as DictKv<T, K>;
}

/**
 * Converts a dictionary object into an array of `KeyValue` dictionaries
 * while maintaining narrow type definitions.
 */
export function kvDictArray<T extends NonNullable<{}>>(obj: T) {
  const out: any[] = [];

  for (const key of keys(obj)) {
    const value = pickValue(key, obj);
    out.push({ key, value });
  }

  return out as DictKv<T, keyof T>[];
}


