import { AnyFunction } from "src/runtime";

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
  : T extends readonly any[]
  ? {
    [K in keyof T]: Widen<T[K]>
  }
  : T extends {}
  ? {}
  : T;
