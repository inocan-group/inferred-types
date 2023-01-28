import { isArray } from "runtime/type-guards";
import type { IfArray } from "types/boolean-logic/array";
import type { Narrowable } from "types/literals";

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
  isAnArray: <N extends T & readonly any[]>(arr: N) => IF,
  isNotAnArray: <N extends Exclude<T, any[] | readonly any[]>>(nonArr: N) => ELSE
) {
  return (isArray(val) ? isAnArray(val as any) : isNotAnArray(val as any)) as IfArray<T, IF, ELSE>;
}