import { Narrowable } from "src/types/Narrowable";
import { IfString } from "src/types/boolean-logic/string";

/**
 * **isString**
 *
 * Returns true or false on whether the passed in parameter is a
 * string (either a wide string or a string literal).
 *
 * The boolean return is traceable by the type system as well as the
 * runtime system.
 */
export function isString<T>(value: T): value is T & string {
  return (typeof value === "string");
}

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
export function ifString<T extends Narrowable, IF extends Narrowable, ELSE extends Narrowable>(
  val: T,
  ifVal: <V extends string>(t: V & T) => IF,
  elseVal: <V extends Exclude<T, string>>(v: V & T) => ELSE
) {
  return (
    isString(val) 
      ? ifVal(val as string & T) 
      : elseVal(val as Exclude<T, string>)
  ) as IfString<T, IF, ELSE>;
}