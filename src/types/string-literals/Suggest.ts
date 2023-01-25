import { IsLiteral, TupleToUnion } from "src/types";
import { FilterNarrow } from "types/lists/FilterNarrow";
import { IfString } from "../../boolean-logic/string";

/**
 * **Suggest**`<T>`
 *
 * Type utility that helps to build a enumerated set
 * of string literals which _could_ be the value for
 * a string based property but _allows_ a string that
 * is not part of the suggestion to be typed in too.
 * 
 * - `T` can be a _union_ of string
 * literals or an _array_ of string literals. 
 * - If T is a wide string then we must return
 * just a wide string as no suggestions are possible 
 */
export type Suggest<T extends string | number | readonly string[] | readonly number[]> = //
T extends readonly string[]
  ? TupleToUnion<FilterNarrow<T, string>> | (string & {})
  : T extends readonly number[]
    ? TupleToUnion<FilterNarrow<T, number>> | (string & {})
  : IsLiteral<T> extends true
    ? IfString<T, T | (string & {}), `${T & number}` | (string & {})>
    : IfString<T, string, `${number}`>;

/**
 * **SuggestNumeric**`<T>`
 *
 * Type utility that helps to build a enumerated set
 * of numeric literals which _could_ be the value for
 * a number based property but _allows_ a number that
 * is not part of the suggestion to be typed in too.
 */
export type SuggestNumeric<T extends number> = T | (number & {});
