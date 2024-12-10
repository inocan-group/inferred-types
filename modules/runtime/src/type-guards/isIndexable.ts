import type { AnyObject, Indexable } from "inferred-types/types";
import { keysOf } from "inferred-types/runtime";

/**
 * **isIndexable**(value)
 *
 * Type guard which validates that the value passed in can be _indexed_
 */
export function isIndexable<T>(value: T): value is T & Indexable {
  return !!(Array.isArray(value) || (typeof value === "object" && keysOf(value as AnyObject).length > 0));
}
