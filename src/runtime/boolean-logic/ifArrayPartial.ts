import { Narrowable } from "inferred-types/dist/types/index";
import { ifArray } from "./ifArray";



export function ifArrayPartial<T extends Narrowable>() {
  return <IF extends Narrowable, ELSE extends Narrowable>(
    isAnArray: <N extends T & readonly unknown[]>(arr: N) => IF,
    isNotAnArray: <N extends Exclude<T, unknown[] | readonly unknown[]>>(nonArr: N) => ELSE
  ) => {
    return <V extends T>(val: V) => ifArray(val, isAnArray, isNotAnArray);
  };
}
