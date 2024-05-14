import {  IsNumber, Narrowable } from "src/types/index";
import { isNumber } from "../type-guards/isNumber";


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
  TContent extends Narrowable, 
  TIf extends Narrowable, 
  TElse extends Narrowable, 
>(
  val: TContent, 
  ifVal: <V extends TContent & number>(v: V) => TIf, 
  elseVal: <V extends Exclude<TContent, number>>(v:V) => TElse
) {
  return (
    isNumber(val) 
      ? ifVal(val as TContent & number) 
      : elseVal(val as Exclude<TContent, number>)
  ) as unknown as IsNumber<TContent> extends true ? TIf : TElse;
}
