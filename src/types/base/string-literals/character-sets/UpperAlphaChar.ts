import { UPPER_ALPHA_CHARS } from "src/constants";
import { Mutable, TupleToUnion } from "../..";

/** 
 * **UpperAlphaChar**
 * 
 * Uppercase alphabetic character.
 * 
 * **Related:** `AlphaChar`, `LowerAlphaChar`, `UpperAlpha`
 */
export type UpperAlphaChar = TupleToUnion<Mutable<typeof UPPER_ALPHA_CHARS>>;
