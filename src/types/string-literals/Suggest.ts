/* eslint-disable @typescript-eslint/ban-types */
import type { 
  Filter,  
  IsString , 
  If,
  IsStringLiteral, 
  ScalarNotSymbol, 
  TupleToUnion 
} from "src/types/index";

/**
 * **Suggest**`<T>`
 *
 * Type utility that helps to build a enumerated set
 * of string literals which _could_ be the value for
 * a string based property but _allows_ a string that
 * is not part of the suggestion to be typed in too.
 * 
 * - `T` can be a _union_ of string literals or an 
 * _array_ of string literals.
 * - If T is a wide string then we must return
 * just a wide string as no suggestions are possible
 */
export type Suggest<T extends ScalarNotSymbol | readonly unknown[]> = //
T extends string | number | readonly string[] | readonly number[]
? T extends readonly string[]
  ? TupleToUnion<Filter<T, string, "equals">> | (string & {})
  : T extends readonly number[]
    ? TupleToUnion<Filter<T, number, "equals">> | (string & {})
  : IsStringLiteral<T> extends true
    ? If<IsString<T>, T | (string & {}), `${T & number}` | (string & {})>
    : If<IsString<T>, string, `${number}`>
: never;

/**
 * **SuggestNumeric**`<T>`
 *
 * Type utility that helps to build a enumerated set
 * of numeric literals which _could_ be the value for
 * a number based property but _allows_ a number that
 * is not part of the suggestion to be typed in too.
 */
export type SuggestNumeric<T extends number> = T | (number & {});

