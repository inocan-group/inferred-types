import { Concat } from "runtime/lists/Concat";
import { ErrorCondition } from "runtime/literals/ErrorCondition";
import { ToString } from "../type-conversion";

/**
 * Utility type which returns the length of an array literal
 * 
 * ```ts
 * type Three = Length<[ "a", "b", "c" ]>;
 * ```
 */
export type Length<T extends any | any[] | readonly any[]> = T extends readonly any[]
  ? T["length"]
  : T extends any[] 
    ? number 
    : ErrorCondition<Concat<["Length<T> used on non-array element: ", ToString<T>]>>;
