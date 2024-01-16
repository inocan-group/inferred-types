import {  Split } from "src/types";

/**
 * **split**(str, sep)
 * 
 * Splits a string on a given separator while preserving string literal typing
 * where available. Behavior with non-string types is:
 * 
 * - `number` - converted to string and then split
 * 
 * All are other types are disallowed.
 */
export function split<
  T extends string, 
  S extends string
>(str: T, sep: S = "" as S) {
  return str.split(sep) as unknown as Split<T,S>
}

