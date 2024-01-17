/* eslint-disable @typescript-eslint/ban-types */
import { AnyFunction, AnyObject, IsEqual, WidenProps } from "src/types/index";

/**
 * **Widen**<T>
 * 
 * Makes all efforts to _widen_ the type found (though 
 * not to the point it is "unknown" or "any").
 */
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
  : IsEqual<{}, T> extends true
  ? object
  : T extends AnyObject
    ? WidenProps<T>
  : T;
