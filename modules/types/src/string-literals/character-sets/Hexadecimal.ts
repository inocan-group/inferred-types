import type {
  NumericChar,
  Suggest,
} from "inferred-types/types";

/**
 * Valid hexadecimal character
 *
 * **Related:** `IsHexadecimal`, `Hexadecimal`, `SuggestHexadecimal`
 */
export type HexadecimalChar = NumericChar | "A" | "B" | "C" | "D" | "E" | "F" | "a" | "b" | "c" | "d" | "e" | "f";

/**
 * **Hexadecimal**
 *
 * A decent approximation for typing a _hexadecimal_ number representation.
 * For stronger type checking use `IsHexadecimal<T>`
 */
export type Hexadecimal = `#${HexadecimalChar}${HexadecimalChar}${string}`;

/**
 * A string suggestion for hexadecimal types
 */
export type SuggestHexadecimal = Suggest<"#FFFF" | "#CBDB">;
