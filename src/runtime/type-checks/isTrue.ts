import {  IfFalse, IfTrue, IsTrue } from "src/types/boolean-logic";
import { Narrowable } from "src/types/Narrowable";

/**
 * Run-time and type checking of whether a variable is `true`.
 */
export function isTrue<T extends Narrowable>(i: T) {
  return (typeof i === "boolean" && i === true) as IsTrue<T>;
}

/**
 * **ifTrue**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * _true_.
 *
 * @param val the value being tested
 * @param ifVal the value (strongly typed) returned if val is _true_ value
 * @param elseVal the value (strongly typed) returned if val is NOT a _true_ value
 *
 * Note: at runtime there's no way to distinguish if the value was widely or loosely
 * typed so unlike the type utility there is no "MAYBE" state but if a wide type if
 * encountered the _type_ will the union of `IF` and `ELSE`.
 */
export function ifTrue<T extends boolean, IF extends Narrowable, ELSE extends Narrowable>(
  val: T,
  ifVal: <V extends T & true>(val: V) => IF,
  elseVal: <V extends Exclude<T, true>>(val: V) => ELSE
) {
  return (
    isTrue(val) 
    ? ifVal(val as true & T) 
    : elseVal(val as Exclude<T, true>)
  ) as unknown as  IfTrue<
    T, 
    IF, 
    IfFalse<T, ELSE, IF | ELSE>,
    IF | ELSE
  >;
}
