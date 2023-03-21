import type { IfStartsWith, Narrowable } from "src/types";
import { isNumber, isString } from "src/runtime";

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
  return (
    isString(val) ? val.startsWith(startingWith) ? true : false
    : isNumber(val) ? String(val).startsWith(startingWith) ? true : false
    : false
  ) as IfStartsWith<TValue, TStartsWith, true, false>;
};
