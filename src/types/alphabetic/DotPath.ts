import {  Or } from "../boolean-logic";
import { And } from "../boolean-logic/And";
import { EndsWith } from "../boolean-logic/EndsWith";
import { StartsWith } from "../boolean-logic/StartsWith";
import { Includes } from "../boolean-logic/string";
import { AfterFirst } from "../lists";
import { First } from "../lists/First";
import { Split } from "../lists/Split";
import { AlphaNumericChar } from "./alpha-characters";

export type DotPathChar = AlphaNumericChar | "_" | "-";

type Segments<T extends string> = Split<T, ".">;

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
 * Forces a string to be a "dot path" which means that it has alphanumeric
 * characters and a few symbols [`_`, `-`,  ], segmented by 
 */
export type DotPath<T extends string> = Or<[
  StartsWith<T, ".">,
  EndsWith<T, ".">,
  Includes<T, "..">
]> extends true 
  ? never
  : ValidateSegments<Segments<T>> extends true ? T : never;
