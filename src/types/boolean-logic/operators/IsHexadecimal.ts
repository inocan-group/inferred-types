import { HasOtherCharacters, Hexadecimal, HexadecimalChar, IsStringLiteral } from "src/types/index"

/**
 * **IsHexadecimal**`<T>`
 * 
 * Ensures that `T` is a valid hexadecimal and converts to **never**
 * otherwise.
 */
export type IsHexadecimal<T> = T extends string
? IsStringLiteral<T> extends true
  ? T extends Hexadecimal
    ? HasOtherCharacters<T, HexadecimalChar | "#"> extends true
      ? false
      : true
  : false
  : boolean
: boolean;
