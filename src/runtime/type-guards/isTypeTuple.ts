import { Narrowable } from "src/types/Narrowable";
import { TypeTuple } from "src/types/type-conversion/TypeTuple";

/**
 * **isTypeTuple**(value)
 * 
 * A type-guard which detects if passed in value is a `TypeTuple`.
 */
export function isTypeTuple<T extends Narrowable, V extends TypeTuple<T, string>>(value: unknown | V): value is V {
  return Array.isArray(value) && value.length === 3 && typeof value[1] === "function";
}
