import type { Concat, ErrorCondition, ToString } from "src/types";


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
    : ErrorCondition<"invalid-generic", Concat<["Length<T> used on non-array element: ", ToString<T>]>>;
