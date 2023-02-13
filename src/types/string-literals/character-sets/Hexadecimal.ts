import { IsStringLiteral, NotCharacters } from "src/types/boolean-logic";
import { StripLeading } from "../StripLeading";
import { Suggest } from "../Suggest";
import { NumericChar } from "./NumericChar";

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
