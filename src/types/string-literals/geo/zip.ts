import { Chars, First, Mutable, NumericChar, TupleToUnion } from "src/types/index";
import  { ZIP_TO_STATE } from "inferred-types";

/**
 * **Zip5**
 *
 * A five digit zip code.
 *
 * **Related:** `ZipPlus4`, `ZipCode`
 */
export type Zip5 = `${NumericChar}${number}${NumericChar}${number}${NumericChar}`;

type Z2S = Mutable<typeof ZIP_TO_STATE>;

/**
 * **ZipToState**`<T>`
 *
 * Converts a zip code into a _union type_ of
 */
export type ZipToState<
  T extends string
> = First<Chars<T>> extends keyof Z2S
? TupleToUnion<Z2S[First<Chars<T>>]>
: never;


export type ZipPlus4 = `${Zip5}${NumericChar}${number}`;

/**
 * A relatively strong type for Zip5 or Zip5+4 zip codes
 */
export type ZipCode = ZipPlus4 | Zip5;


