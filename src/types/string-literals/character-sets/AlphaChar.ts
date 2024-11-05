import { LowerAlphaChar , UpperAlphaChar } from "inferred-types/dist/types/index";

/**
 * **AlphaChar**
 *
 * Alphabetical character (both upper and lowercase).
 *
 * **Related:** `UpperAlphaChar`, `LowerAlphaChar`, `Alpha`
 */
export type AlphaChar = UpperAlphaChar | LowerAlphaChar;
