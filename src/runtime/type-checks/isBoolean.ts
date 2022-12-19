import { Narrowable } from "src/types";
import { IfBoolean, IsBoolean } from "src/types/boolean-logic";

/**
 * Runtime and type checks whether a variable is a boolean value.
 */
export function isBoolean<T extends Narrowable>(i: T): IsBoolean<T> {
  return (typeof i === "boolean") as IsBoolean<T>;
}

/**
 * **ifBoolean**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * a _boolean_ and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested
 * @param ifBoolean the value (strongly typed) returned if val is _boolean_
 * @param notBoolean the value (strongly typed) returned if val is NOT a _boolean
 */
export function ifBoolean<
  T, 
  IF extends Narrowable, 
  ELSE extends Narrowable
>(
  val: T, 
  ifBoolean: <V extends Narrowable & boolean>(v: V & T) => IF, 
  notBoolean: <V extends Exclude<T, boolean>>(v: V) => ELSE
): IfBoolean<T,IF,ELSE> {
  return (
    isBoolean(val) ? ifBoolean(val as T & boolean) : notBoolean(val as Exclude<T, boolean>)
  ) as IsBoolean<T> extends true ? IF : ELSE;
}
