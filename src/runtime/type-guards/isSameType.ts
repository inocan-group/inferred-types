import { Narrowable } from "src/types";


/**
 * **isSameType**(value, comparison)
 * 
 * Type guard which takes a value and then compares it to another to determine
 * if the two types are the same. The _comparison_ type can be an actual variable
 * with a type but it can also be a `TypeToken` representing a type.
 */
export function isSameType<
  TVal extends Narrowable, 
  TComparison extends Narrowable
>(value: TVal, comparison: TComparison) => {
  if (isTypeToken(comparison)) {

  }
}
