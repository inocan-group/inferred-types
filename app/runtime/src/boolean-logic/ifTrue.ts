import { IsFalse, IsTrue, Narrowable } from "@inferred-types/types";
import { isTrue } from "src/runtime/index";


/**
 * **ifTrue**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * _true_. Valid outcomes are:
 *
 * - **IF** - returned when T is narrowly typed as `true`
 * - **ELSE** - returned when T is narrowly typed as `false`
 * - **IF | ELSE** - returned when T is a `boolean` type
 */
export function ifTrue<
  TContent extends Narrowable,
  TIf extends Narrowable,
  TElse extends Narrowable
>(
  val: TContent,
  ifVal: <V extends TContent & true>(val: V) => TIf,
  elseVal: <V extends Exclude<TContent, true>>(val: V) => TElse
) {
  return (
    //
    isTrue(val)
      ? ifVal(val as TContent & true)
      : elseVal(val as Exclude<TContent, true>)
  ) as unknown as
    [IsTrue<TContent>] extends [true]
    ? TIf
    : [IsFalse<TContent>] extends [true] ? TElse : TIf | TElse;
}
