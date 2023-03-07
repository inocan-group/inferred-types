import { Narrowable } from "src/types/literals";
import { ifArray } from "src/runtime/boolean-logic";

export function ifArrayPartial<T extends Narrowable>() {
  return <IF extends Narrowable, ELSE extends Narrowable>(
    isAnArray: <N extends T & readonly any[]>(arr: N) => IF,
    isNotAnArray: <N extends Exclude<T, any[] | readonly any[]>>(nonArr: N) => ELSE
  ) => {
    return <V extends T>(val: V) => ifArray(val, isAnArray, isNotAnArray);
  };
}
