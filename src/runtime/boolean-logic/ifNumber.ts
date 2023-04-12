import { IsNumber } from "src/types";
import { Narrowable } from "src/types";
import { isNumber } from "src/runtime";

/**
 * **ifNumber**(val, ifVal, elseVal)
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * a _number_ and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested
 * @param ifVal the value (strongly typed) returned if val is number
 * @param elseVal the value (strongly typed) returned if val is NOT a number
 */
export function ifNumber<
  T extends Narrowable, 
  IF extends Narrowable, 
  ELSE extends Narrowable, 
>(
  val: T, 
  ifVal: <V extends T & number>(v: V) => IF, 
  elseVal: <V extends Exclude<T, number>>(v:V) => ELSE
) {
  return (
    isNumber(val) 
      ? ifVal(val as T & number) 
      : elseVal(val as Exclude<T, number>)
  ) as IsNumber<T> extends true ? IF : ELSE;
}
