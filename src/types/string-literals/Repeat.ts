import { IsNegativeNumber , FixedLengthArray } from "src/types";
import { Concat } from "./Concat";

/**
 * **Repeat**`<TStr,TCount>`
 * 
 * Creates a string literal by repeating a given string `TStr`, `TCount` times.
 */
export type Repeat<
  TStr extends string,
  TCount extends number
> = IsNegativeNumber<TCount> extends true
? ""
: Concat<FixedLengthArray<TStr,TCount>>;

