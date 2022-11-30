import { IfStringLiteral } from "src/types/type-checks";
import { Narrowable } from "../Narrowable";
/**
 * **StartsWith**<TValue, TStartsWith>
 *
 * A type utility which checks whether `T` _starts with_ the string literal `U`.
 *
 * If both `T` and `U` are string literals then the type system will resolve
 * to a literal `true` or `false` but if either is not a literal that it will
 * just resolve to `boolean` as the value can not be known at design time..
 */
export type StartsWith<TValue extends unknown, TStartsWith extends unknown> = TValue extends string
  ? TStartsWith extends string
    ? TValue extends `${TStartsWith}${string}`
      ? IfStringLiteral<
          TValue, //
          IfStringLiteral<TStartsWith, true, boolean>,
          boolean
        >
      : IfStringLiteral<TValue, false, boolean>
    : false
  : false;

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
  TValue extends unknown,
  TStartsWith extends unknown,
  IF extends Narrowable,
  ELSE extends Narrowable
> = StartsWith<TValue, TStartsWith> extends true
  ? IF
  : StartsWith<TValue, TStartsWith> extends false
  ? ELSE
  : IF | ELSE;
