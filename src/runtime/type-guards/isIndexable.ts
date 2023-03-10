import { AnyObject } from "src/types";
import { Indexable } from "src/types/base-types/Indexable";
import { keysOf } from "../dictionary/keysOf";

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
