import { Narrowable } from "src/types";
import { ifNumber, ifString } from "src/runtime/type-checks";

export type StartingWithTypeGuard<T extends string> = <
  V extends Narrowable
>(val: V) => val is V & `${string}${T}`;

/**
 * **startsWith**(startingWith) => (val)
 * 
 * Creates a TypeGuard which checks whether a value _starts with_ a
 * particular string literal.
 */
export const startsWith = <
  T extends string
>(startingWith: T): StartingWithTypeGuard<T> => <V extends Narrowable>(val: V): val is V & `${string}${T}` => {
  return ifString(
    val,
    v => v.startsWith(startingWith) ? true : false,
    v => ifNumber(
      v, 
      n => String(n).startsWith(startingWith) ? true : false,
      () => false
    )
  );
};
