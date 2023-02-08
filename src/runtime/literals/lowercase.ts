import { LowerCase } from "src/types/string-literals";

/**
 * **lowercase**()
 * 
 * Run time utility which ensures all letters are lowercase while preserving
 * string literal types.
 */
export function lowercase<T extends string>(str: T): LowerCase<T> {
  return str.toLowerCase() as LowerCase<T>;
}
