import { IsUndefined, Narrowable } from "../../types";
import { isDefined, isUndefined } from "../type-guards";

/**
 * **ifUndefined**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * _undefined_ and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested
 * @param ifVal the value (strongly typed) returned if val is `undefined`
 * @param elseVal the value (strongly typed) returned if val is NOT `undefined`
 */
export function ifUndefined<
  T extends Narrowable, 
  IF extends Narrowable = undefined, 
  ELSE extends Narrowable = Exclude<T, undefined>
>(
  val: T,
  ifVal: (v: Exclude<T, undefined>) => IF,
  elseVal: (v: undefined) => ELSE
) {
  return (
    isUndefined(val) ? ifVal(val as Exclude<T,undefined>) : elseVal(undefined)
  ) as IsUndefined<T> extends true ? IF : ELSE;
}

export function ifDefined<
  T extends Narrowable, 
  IF extends Narrowable = Exclude<T, undefined>, 
  ELSE extends Narrowable = undefined
>(
  val: T,
  ifVal: <V extends Exclude<T, undefined>>(v: V) => IF,
  elseVal: () => ELSE
) {
  return isDefined(val) ? ifVal : elseVal;
}
