/* eslint-disable @typescript-eslint/ban-types */
import { AnyFunction, IndexableObject } from "src/types/base-types";


export type Widen<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends readonly string[]
  ? string[]
  : T extends readonly number[]
  ? number[]
  : T extends readonly boolean[]
  ? boolean[]
  : T extends readonly AnyFunction[]
  ? AnyFunction[]
  : T extends readonly unknown[]
  ? {
    [K in keyof T]: Widen<T[K]>
  }
  : T extends IndexableObject
    ? IndexableObject
  : T extends object
    ? object
  : T extends {}
  ? {}
  : T;
