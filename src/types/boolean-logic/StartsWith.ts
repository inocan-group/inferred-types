import {  IfNumericLiteral, IsStringLiteral , IfString} from "src/types";
import { Narrowable } from "../literals/Narrowable";
import { ToString } from "../type-conversion/ToString";
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
  TValue extends Narrowable,
  TStartsWith extends string | number
> = TStartsWith extends number 
? StartsWith<TValue, ToString<TStartsWith>>
: IfString<
  TValue, 
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

