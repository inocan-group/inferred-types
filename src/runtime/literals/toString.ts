import { ToString } from "src/types";
import { Narrowable } from "types/literals/Narrowable";

/**
 * **toString**()
 * 
 * Runtime utility which converts any given type to a string while
 * preserving literal types.
 */
export function toString<T extends Narrowable>(val: T): ToString<T> {
  return String(val) as ToString<T>;
}
