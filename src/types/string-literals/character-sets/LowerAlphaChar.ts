import { LOWER_ALPHA_CHARS } from "src/constants/index";
import { Mutable, TupleToUnion } from "src/types/index";

/** 
 * **LowerAlphaChar**
 * 
 * Lowercase alphabetic character.
 * 
 * **Related:** `AlphaChar`, `UpperAlphaChar`, `LowerAlpha`
 */
export type LowerAlphaChar = TupleToUnion<Mutable<typeof LOWER_ALPHA_CHARS>>;
