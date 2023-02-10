import {  IfLiteral,  Includes,  Or } from "../boolean-logic";
import { And } from "../boolean-logic/And";
import { EndsWith } from "../boolean-logic/EndsWith";
import { StartsWith } from "../boolean-logic/StartsWith";
import { AfterFirst } from "../lists";
import { First } from "../lists/First";
import { Split } from "../lists/Split";
import { AlphaNumericChar } from "./alpha-characters";

export type DotPathChar = AlphaNumericChar | "_" | "-";

type ValidDotChars<T extends string> = T extends `${DotPathChar}${infer REST}`
  ? ValidDotChars<REST>
  : T extends ""
    ? true
    : false;

type ValidateSegments<
  Segments extends readonly string[],
  Validated extends readonly boolean[] = readonly []
> = [] extends Segments
  ? And<Validated>
  : ValidDotChars<First<Segments>> extends true
    ? ValidateSegments<AfterFirst<Segments>, readonly [...Validated, true]>
    : ValidateSegments<AfterFirst<Segments>, readonly [...Validated, false]>;


/**
 * **DotPath**`<T>`
 * 
 * Validates `T` as a dotpath and returns `T` if valid, otherwise `never`.
 * 
 * - leading and trailing `.` characters are **not** allowed
 * - a number will be converted to a numeric string (which can be valid)
 * - alphanumeric characters and a few symbols ()`_`, `-`, etc.) allowed
 * - wide strings and numbers always resolve to `T` as there is no way to check
 * - a `null` is also allowed as it's meant to express "no path"
 */
export type DotPath<T extends string | number | null> = T extends null
  ? T
  : T extends number 
    ? DotPath<`${T}`> // convert to numeric string and try again
    : IfLiteral<
        T,
        // T is a literal
        Or<[
          StartsWith<T, ".">,
          EndsWith<T, ".">,
          Includes<T & string, "..">
        ]> extends true 
          ? never
          : ValidateSegments<Split<T & string, ".">> extends true
            ? T
            : never
        ,
        // T is not a literal
        T
      >;

