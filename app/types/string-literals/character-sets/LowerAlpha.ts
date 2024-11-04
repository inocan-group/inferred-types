import {  AsArray, IfAllExtend,  If, IsStringLiteral, LowerAlphaChar,  Chars } from "src/types/index";

/**
 * **LowerAlpha**`<T>`
 * 
 * Converts `T` to _never_ if `T` is not composed of only lowercase alphabetic chars. Possible values are:
 * 
 * - `T` - when T is a string literal and characters are lowercase alphabetic
 * - `string` - when T is a wide string type
 * - `never` - all other types of `T` are converted to never
 */
export type IsLowerAlpha<T> = T extends string
  ? If<
      IsStringLiteral<T>,
      IfAllExtend<AsArray<Chars<T>>, LowerAlphaChar, T, never>,
      string
    >
  : never;

