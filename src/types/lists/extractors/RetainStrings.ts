import { AnyObject } from "../../../types";
import { ArrExtractor } from "./extractor";

/**
 * **RetainStrings**`<T>`
 * 
 * Retains the _string_ values from arrays an objects and discards the rest.
 */
export type RetainStrings<
  T extends any[] | readonly any[] | AnyObject
> = T extends any[]
  ? ArrExtractor<T, string, "retain">
  : T extends readonly any[]
  ? Readonly<ArrExtractor<T, string, "retain">>
  : T extends AnyObject
  ? any
  : never;
