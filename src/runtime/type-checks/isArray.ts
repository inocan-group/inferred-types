import { IsArray, IfArray } from "src/types/boolean-logic/array";
import { Narrowable } from "src/types/Narrowable";

export function isArray<T>(i: T) {
  return (Array.isArray(i) === true) as IsArray<T>;
}

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

export function ifArrayPartial<T extends Narrowable>() {
  return <IF extends Narrowable, ELSE extends Narrowable>(
    isAnArray: <N extends T & readonly any[]>(arr: N) => IF,
    isNotAnArray: <N extends Exclude<T, any[] | readonly any[]>>(nonArr: N) => ELSE
  ) => {
    return <V extends T>(val: V) => ifArray(val, isAnArray, isNotAnArray);
  };
}


export function ifReadonlyArray<
  // value which is possibly an array
  T extends Narrowable,
  // functions which return a known type
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  val: T,
  isAnArray: <N extends T & readonly Narrowable[]>(arr: N) => IF,
  isNotAnArray: <N extends Exclude<T, any[] | readonly any[]>>(nonArr: N) => ELSE
) {
  return (
    isArray(val) ? isAnArray(val as any) : isNotAnArray(val as any)
  ) as IfArray<T, IF, ELSE>;
}
