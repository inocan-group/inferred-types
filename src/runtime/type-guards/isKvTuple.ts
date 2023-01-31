import { KV } from "src/types/type-conversion/ToKV";

/**
 * **isKvTuple**(value)
 * 
 * Type guard which checks whether the value being tested is of the type `KV`
 * 
 * **Related:** `isKvPair`, `ifKvTuple`
 */
export function isKvTuple<T extends KV>(value: unknown): value is T {
  return Array.isArray(value) && value.length === 3 && value[0] === "KV";
}
