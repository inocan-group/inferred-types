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

export type Immutable<T extends { [propName:string]: any }> ={
  readonly [key in keyof T]: T[key] extends { [propName:string]: any }
    ? Immutable<T[key]>
    : T[key]
};
