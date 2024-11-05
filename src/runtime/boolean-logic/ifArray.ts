import type {  IsArray, Narrowable } from "inferred-types/dist/types/index";

/**
 * **ifArray**(T, IF, ELSE)
 *
 * A utility which evaluates a type `T` for whether it is an array and then
 */
export function ifArray<
  // value which is possibly an array
  T extends Narrowable,
  // functions which return a known type
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  val: T,
  isAnArray: <N extends T & unknown[]>(arr: N) => IF,
  isNotAnArray: <N extends Exclude<T, unknown[] | readonly unknown[]>>(nonArr: N) => ELSE
) {
  return (
    Array.isArray(val) ? isAnArray(val) : isNotAnArray(val as Exclude<T, unknown[] | readonly unknown[]>)
  ) as IsArray<T> extends true ? IF : ELSE;
}
