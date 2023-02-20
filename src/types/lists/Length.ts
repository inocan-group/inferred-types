import type { Concat, ToString } from "src/types";
import { ErrorCondition } from "src/runtime";

/**
 * Utility type which returns the length of an array literal
 * 
 * ```ts
 * type Three = Length<[ "a", "b", "c" ]>;
 * ```
 */
export type Length<T extends unknown | unknown[] | readonly unknown[]> = T extends readonly unknown[]
  ? T["length"]
  : T extends unknown[] 
    ? number 
    : ErrorCondition<Concat<["Length<T> used on non-array element: ", ToString<T>]>>;
