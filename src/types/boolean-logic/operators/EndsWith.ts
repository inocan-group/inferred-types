import { IfNumericLiteral, IsStringLiteral, IfString, ToString } from "src/types";

/**
 * **EndsWith**<T,U>
 *
 * A type utility which checks whether `T` _ends with_ the string literal `U`.
 *
 * If both `T` and `U` are string literals then the type system will resolve
 * to a literal `true` or `false` but if either is not a literal that it will
 * just resolve to `boolean` as the value can not be known at design time..
 */
export type EndsWith<
  TValue,
  TEndsWith extends string | number
> = TEndsWith extends number 
? EndsWith<TValue, ToString<TEndsWith>>
: IfString<
  TValue,
  IsStringLiteral<TEndsWith> extends true
    ? IsStringLiteral<TValue> extends true // both literals
      ? TValue extends `${string}${TEndsWith}`
        ? true
        : false
      : boolean
    : boolean,
  TValue extends number 
    ? IfNumericLiteral<
      TValue, 
      EndsWith<ToString<TValue>, TEndsWith>, 
      false
    >
    : false
>;

/**
 * **IfEndsWith**<TValue, TEndsWith, IF, ELSE, MAYBE>
 *
 * Type utility which converts type to `IF` type _if_ `TValue` _ends with_ `TEndsWith` but
 * otherwise converts type to `ELSE`. If there are wide types in the mix then the type will
 * result in the union of IF and ELSE.
 */
export type IfEndsWith<
  TValue,
  TEndsWith,
  IF,
  ELSE
> = TEndsWith extends string
  ? EndsWith<TValue, TEndsWith> extends true
    ? IF
    : EndsWith<TValue, TEndsWith> extends false
    ? ELSE
    : IF | ELSE
  : TEndsWith extends number
    ? number extends TEndsWith
      ? never
      : IfEndsWith<TValue, ToString<TEndsWith>, IF, ELSE>
    : never;
