import {  IfNumericLiteral, IsStringLiteral } from "src/types/boolean-logic";
import { Narrowable } from "../Narrowable";
import { ToString } from "../type-conversion/ToString";
import { IfString} from "./string";
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
  TStartsWith extends string
> = IfString<
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

/**
 * **IfStartsWith**<TValue, TStartsWith, IF, ELSE, MAYBE>
 *
 * Type utility which converts type to `IF` type _if_ TValue _starts with_ `TStartsWith` but
 * otherwise converts type to `ELSE`.
 *
 * Note, that there is also an optional `MAYBE` type
 * which can be stated for cases where TValue or TStartsWith _might_ be the wider `string`
 * type and therefore the type is unknown at design time.
 */
export type IfStartsWith<
  TValue extends Narrowable,
  TStartsWith extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = TStartsWith extends string
      // TStartsWith is a string
      ? StartsWith<TValue, TStartsWith> extends true
        ? IF
        : StartsWith<TValue, TStartsWith> extends false
        ? ELSE
        : IF | ELSE
      : // TStartsWith not a string
        TStartsWith extends number
          ? number extends TStartsWith
            ? never
            : IfStartsWith<TValue, ToString<TStartsWith>, IF, ELSE>
          : never;
