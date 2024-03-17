import type { Narrowable } from "src/types/index";
import { isString } from "../isString";
import { isNumber } from "../isNumber";


/**
 * **StartingWithTypeGuard**`<literal>`
 * 
 * A type guard built using the `startsWith` utility.
 */
export type StartingWithTypeGuard<TStartsWith extends string> = <
  TValue extends Narrowable
>(val: TValue) => val is TValue & `${TStartsWith}${string}`;

/**
 * **startsWith**(startingWith) => (val)
 * 
 * A TypeGuard which checks whether a value _starts with_ a
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
  ) ;
};

