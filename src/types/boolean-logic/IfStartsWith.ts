import { Narrowable } from "../literals/Narrowable";
import { ToString } from "../type-conversion/ToString";
import { StartsWith } from "./StartsWith";

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
