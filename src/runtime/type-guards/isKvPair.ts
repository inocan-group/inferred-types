import { Narrowable } from "src/types";
import { KvPair } from "src/types/type-conversion/KvToObject";

/**
 * **isKvPair**
 * 
 * TypeGuard which validates whether the past in value is a `KvPair`
 */
export function isKvPair<T extends KvPair<string, Narrowable>>(value: unknown | T): value is T {
  return typeof value === "object" && "key" in (value as Object) && "value" in (value as Object) && Object.keys(value as Object).length === 2; 
}
