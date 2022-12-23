import { ExpandRecursively } from "../ExpandRecursively";

/**
 * Makes a readonly structure mutable
 */
export type Mutable<T> = ExpandRecursively<{
  -readonly [K in keyof T]: T[K] extends {} 
    ? Mutable<T[K]> 
    : T[K] extends readonly (infer R)[]
      ? R[]
      : T[K];
}>;


export type MutableArray<T extends readonly any[]> = [...T];