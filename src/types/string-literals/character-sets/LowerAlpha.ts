import {  IfAllExtend,  IfStringLiteral, LowerAlphaChar, Split } from "src/types";

/**
 * **LowerAlpha**`<T>`
 * 
 * Converts `T` to _never_ if `T` is not composed of only lowercase alphabetic chars. Possible values are:
 * 
 * - `T` - when T is a string literal and characters are lowercase alphabetic
 * - `string` - when T is a wide string type
 * - `never` - all other types of `T` are converted to never
 */
export type LowerAlpha<T> = T extends string
  ? IfStringLiteral<
      T,
      IfAllExtend<Split<T>, LowerAlphaChar, T, never>,
      string
    >
  : never;

