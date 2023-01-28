import type { IfStartsWith, Narrowable } from "../../../types";
import { ifNumber } from "../../../runtime/boolean-logic";
import { ifString } from "../isString";

export type StartingWithTypeGuard<TStartsWith extends string> = <
  TValue extends Narrowable
>(val: TValue) => val is TValue & `${TStartsWith}${string}`;

/**
 * **startsWith**(startingWith) => (val)
 * 
 * Creates a TypeGuard which checks whether a value _starts with_ a
 * particular string literal.
 */
export const startsWith = <
  TStartsWith extends string
>(startingWith: TStartsWith): StartingWithTypeGuard<TStartsWith> => <
  TValue extends Narrowable
>(val: TValue): val is TValue & `${TStartsWith}${string}`=> {
  return ifString(
    val,
    v => v.startsWith(startingWith) ? true : false,
    v => ifNumber(
      v, 
      () => String(v).startsWith(startingWith) ? true : false,
      () => false
    ) as boolean
  ) as IfStartsWith<TValue, TStartsWith, true, false>;
};
