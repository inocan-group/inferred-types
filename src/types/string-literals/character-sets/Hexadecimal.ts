import { IsLiteralString } from "src/types/boolean-logic";
import { NumericChar } from "./NumericChar";

/**
 * Valid hexadecimal character
 */
export type HexadecimalChar = NumericChar | "A" | "B" | "C" | "D" | "E" | "F" | "a" | "b" | "c" | "d" | "e" | "f";

export type Hexadecimal<T extends string> = IsLiteralString<T>
  ? IfStartsWith<
      T, "#",
      
    >
  : never;
