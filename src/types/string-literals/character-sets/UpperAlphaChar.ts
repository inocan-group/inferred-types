import { UPPER_ALPHA_CHARS } from "src/constants/index";
import { Mutable, TupleToUnion } from "src/types/index";

/** 
 * **UpperAlphaChar**
 * 
 * Uppercase alphabetic character.
 * 
 * **Related:** `AlphaChar`, `LowerAlphaChar`, `UpperAlpha`
 */
export type UpperAlphaChar = TupleToUnion<Mutable<typeof UPPER_ALPHA_CHARS>>;
