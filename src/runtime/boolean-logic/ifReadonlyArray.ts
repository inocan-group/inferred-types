import { isArray } from "runtime/type-guards";
import { IfArray } from "types/boolean-logic";
import { Narrowable } from "types/literals";

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
