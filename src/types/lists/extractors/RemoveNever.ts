import { AnyObject } from "types/boolean-logic";
import { ArrExtractor } from "./extractor";

/**
 * **RemoveNever**`<T>`
 * 
 * Type utility which removes any `never` values from an array/tuple or
 * object properties.
 */
export type RemoveNever<
  T extends any[] | readonly any[] | AnyObject
> = T extends any[]
  ? ArrExtractor<T, never, true>
  : T extends readonly any[]
    ? readonly [...ArrExtractor<T, never, true>]
    : T extends AnyObject
      ? any
      : never;
