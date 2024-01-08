import { LOWER_ALPHA_CHARS } from "src/constants";
import { Mutable, TupleToUnion } from "../..";

/** 
 * **LowerAlphaChar**
 * 
 * Lowercase alphabetic character.
 * 
 * **Related:** `AlphaChar`, `UpperAlphaChar`, `LowerAlpha`
 */
export type LowerAlphaChar = TupleToUnion<Mutable<typeof LOWER_ALPHA_CHARS>>;
