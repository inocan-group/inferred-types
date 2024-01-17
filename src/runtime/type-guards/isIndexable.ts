import { AnyObject, Indexable } from "src/types/index";
import { keysOf } from "src/runtime/index";

/**
 * **isIndexable**(value)
 * 
 * Type guard which validates that the value passed in can be _indexed_
 */
export function isIndexable<T>(value: T): value is T & Indexable {
  return Array.isArray(value) || (typeof value === "object" && keysOf(value as AnyObject).length > 0)
    ? true 
    : false;
}
