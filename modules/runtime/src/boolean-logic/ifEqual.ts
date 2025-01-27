import type { If, IsEqual, IsWideType, Narrowable, Or } from "inferred-types/types";
import { log } from "node:console";

type Rtn<
  TComparator,
  TVal,
  TIf extends <T extends TComparator & TVal>(val: T) => unknown,
  TElse extends <T extends Exclude<TVal, TComparator>>(val: T) => unknown,
> = Or<[IsWideType<TComparator>, IsWideType<TVal>]> extends true
  ? ReturnType<TIf> | ReturnType<TElse>
  : If<IsEqual<TComparator, TVal>, ReturnType<TIf>, ReturnType<TElse>>;

type IfEqualTest<TComparator> = <
  TVal extends Narrowable,
  TIf extends <T extends TComparator & TVal>(val: T) => unknown,
  TElse extends <T extends Exclude<TVal, TComparator>>(val: T) => unknown,
>(
  val: TVal,
  ifTrue: TIf,
  ifFalse: TElse
) => Rtn<TComparator, TVal, TIf, TElse>;

export function ifEqual<
  TComparator extends Narrowable,
>(
  comparator: TComparator,
): IfEqualTest<TComparator> {
  return <
    TVal extends Narrowable,
    TIf extends <T extends TComparator & TVal>(val: T) => unknown,
    TElse extends <T extends Exclude<TVal, TComparator>>(val: T) => unknown,
  >(
    val: TVal,
    ifTrue: TIf,
    ifFalse: TElse = (v => v) as TElse,
  ) => {
    log({ val, comparator });

    if (JSON.stringify(comparator) === JSON.stringify(val)) {
      return ifTrue(val as any) as Rtn<TComparator, TVal, TIf, TElse>;
    }
    else {
      return ifFalse(val as any) as Rtn<TComparator, TVal, TIf, TElse>;
    }
  };
}
