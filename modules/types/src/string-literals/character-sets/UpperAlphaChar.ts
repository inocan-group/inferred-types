import type { UPPER_ALPHA_CHARS } from "inferred-types/constants";

/**
 * **UpperAlphaChar**
 *
 * Uppercase alphabetic character.
 *
 * **Related:** `AlphaChar`, `LowerAlphaChar`, `UpperAlpha`
 */
export type UpperAlphaChar = typeof UPPER_ALPHA_CHARS[number];
