import {  If, IsFalse, IsString, IsTrue, Narrowable } from "src/types/index";
import { isString } from "../type-guards/isString";


/**
 * **ifString**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * a _string_ and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested for being a string
 * @param ifVal the value (strongly typed) returned if val is _string_
 * @param elseVal the value (strongly typed) returned if val is NOT a _string
 */
export function ifString<
  TContent, 
  TIf extends Narrowable, 
  TElse extends Narrowable
>(
  val: TContent,
  ifVal: <V extends TContent & string>(t: V & TContent) => TIf,
  elseVal: <V extends Exclude<TContent, string>>(v: V & TContent) => TElse
) {
  return (
    isString(val) 
      ? ifVal(val as string & TContent) 
      : elseVal(val as Exclude<TContent, string>)
  ) as unknown as 
    If<
      IsTrue<IsString<TContent>>, 
      true, 
      If<IsFalse<IsString<TContent>>, TElse, TIf | TElse>
    >
      

}
