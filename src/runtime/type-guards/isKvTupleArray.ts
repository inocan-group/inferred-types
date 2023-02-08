import { KV } from "../../types";
import { isKvTuple } from "./isKvTuple";

/**
 * **isKvTupleArray**(value)
 * 
 * Type guard to check whether passed in value is an array of `KV`'s.
 * 
 * **Related:** `isKvTuple`
 */
export function isKvTupleArray<
  T extends readonly KV[]
>(value: unknown): value is T {
  return Array.isArray(value) && value.every(i => isKvTuple(i));
}
