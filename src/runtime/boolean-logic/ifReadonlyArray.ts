import { IfArray, Narrowable } from "src/types";
import { isArray } from "src/runtime";

export function ifReadonlyArray<
// value which is possibly an array
T extends Narrowable,
// functions which return a known type
IF extends Narrowable,
ELSE extends Narrowable
>(
val: T,
isAnArray: <N extends T & readonly Narrowable[]>(arr: N) => IF,
isNotAnArray: <N extends Exclude<T, unknown[] | readonly unknown[]>>(nonArr: N) => ELSE
) {
return (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isArray(val) ? isAnArray(val as any) : isNotAnArray(val as any)
) as IfArray<T, IF, ELSE>;
}
