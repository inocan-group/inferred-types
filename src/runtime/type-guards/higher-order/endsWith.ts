import { Narrowable } from "src/types";
import { ifNumber } from "../../boolean-logic";
import { ifString } from "../isString";

export type EndingWithTypeGuard<T extends string> = <
  V extends Narrowable
>(val: V) => val is V & `${string}${T}`;

/**
 * **endsWith**(endingIn) => (val)
 * 
 * Creates a TypeGuard which checks whether a value _ends with_ a
 * particular string literal.
 */
export const endsWith = <
  T extends string
>(endingIn: T): EndingWithTypeGuard<T> => <V extends Narrowable>(val: V): val is V & `${string}${T}` => {
  return ifString(
    val,
    v => v.endsWith(endingIn) ? true : false,
    v => ifNumber(
      v, 
      n => String(n).endsWith(endingIn) ? true : false,
      () => false
    )
  );
  
};
