import { IsStringLiteral, NotCharacters , StripLeading , Suggest , NumericChar } from "src/types/index";

/**
 * Valid hexadecimal character
 */
export type HexadecimalChar = NumericChar | "A" | "B" | "C" | "D" | "E" | "F" | "a" | "b" | "c" | "d" | "e" | "f";

/**
 * **Hexadecimal**`<T>`
 * 
 * Ensures that `T` is a valid hexadecimal and converts to **never**
 * otherwise.
 */
export type Hexadecimal<T extends string> = IsStringLiteral<T> extends true
  ? NotCharacters<StripLeading<T, "#">, HexadecimalChar> extends true
    ? never
    : T
  : never;

/**
 * A string suggestion for hexadecimal types
 */
export type SuggestHexadecimal = Suggest<"#FFFF" | "#CBDB">;
