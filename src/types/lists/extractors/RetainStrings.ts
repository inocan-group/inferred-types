import { AnyObject } from "../../../types";
import { ArrExtractor } from "./extractor";

/**
 * **ExtractStrings**`<T>`
 * 
 * Extracts the _string_ values from arrays an objects and discards the rest.
 */
export type ExtractStrings<
  T extends any[] | readonly any[] | AnyObject
> = T extends any[]
  ? ArrExtractor<T, string>
  : T extends readonly any[]
  ? readonly [...ArrExtractor<T, string>]
  : T extends AnyObject
  ? any
  : never;
