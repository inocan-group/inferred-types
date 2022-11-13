import { Narrowable } from "src/types";
import { IsUndefined } from "src/types/type-checks/IsUndefined";

export function isUndefined<T extends Narrowable>(i: T) {
  return (typeof i === "undefined") as undefined extends T ? true : false;
}

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
export function ifUndefined<T extends Narrowable, IF extends Narrowable, ELSE extends Narrowable>(
  val: T,
  ifVal: IF,
  elseVal: ELSE
) {
  return (isUndefined(val) ? ifVal : elseVal) as IsUndefined<T> extends true ? IF : ELSE;
}
