import { Narrowable, KvDict } from "src/types";

/**
 * **isKvPair**
 * 
 * TypeGuard which validates whether the past in value is a `KvPair`
 */
export function isKvPair<T extends KvDict<string, Narrowable>>(value: unknown | T): value is T {
  return typeof value === "object" && "key" in (value as object) && "value" in (value as object) && Object.keys(value as object).length === 2; 
}
