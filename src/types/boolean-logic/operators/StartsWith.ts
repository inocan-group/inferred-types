import {  IfNumericLiteral, IsStringLiteral , IfString, ToString } from "src/types/index";
/**
 * **StartsWith**<TValue, TStartsWith>
 *
 * A type utility which checks whether `T` _starts with_ the string literal `U`.
 *
 * While `T` _can_ be passed in as a non-string value this almost always resolves
 * to false. The one exception is where a numeric literal can be converted to a
 * string literal.
 */
export type StartsWith<
  TValue,
  TStartsWith extends string | number
> = TStartsWith extends number 
? StartsWith<TValue, ToString<TStartsWith>> // convert to string representation
: IfString<
  TValue, 
  // is a string value
  IsStringLiteral<TStartsWith> extends true
    ? IsStringLiteral<TValue> extends true // both literals
      ? TValue extends `${TStartsWith}${string}`
        ? true
        : false
      : boolean
    : boolean,
  // value is not a string
  IfNumericLiteral<
    TValue, 
    TValue extends number 
      ? StartsWith<ToString<TValue>, TStartsWith> 
      : never, 
    false
  >
>;
