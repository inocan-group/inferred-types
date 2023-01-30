import { AnyObject } from "../../../types";
import { ArrExtractor } from "./extractor";

/**
 * **RemoveStrings**`<T>`
 * 
 * Extracts string values from an array, retains the rest.
 */
export type RemoveStrings<
  T extends any[] | readonly any[] | AnyObject
> = T extends any[]
  ? ArrExtractor<T, string>
  : T extends readonly any[]
  ? readonly [...ArrExtractor<T, string, "remove">]
  : T extends AnyObject
  ? any
  : never;
