import { AnyObject } from "../base-types";
import { ExpandRecursively } from "../literals/ExpandRecursively";

/**
 * Makes a readonly structure mutable
 */
export type Mutable<T> = ExpandRecursively<{
  -readonly [K in keyof T]: T[K] extends AnyObject
    ? Mutable<T[K]> 
    : T[K] extends readonly (infer R)[]
      ? R[]
      : T[K];
}>;


export type MutableArray<T extends readonly unknown[]> = [...T];

export type Immutable<T extends { [propName:string]: unknown }> ={
  readonly [key in keyof T]: T[key] extends { [propName:string]: unknown }
    ? Immutable<T[key]>
    : T[key]
};
