import { ErrorCondition } from "src/types";
import {  isObject } from "src/runtime";

/**
 * **isErrorCondition**(value)
 * 
 * Type guard which checks whether the given value is a `ErrorCondition` type.
 */
export function isErrorCondition<
  Domain extends string,
  Kind extends string,
  Message extends string,
  T extends ErrorCondition<Kind, Message, Domain>
>(value: unknown | T): value is T {
  return (
    isObject(value) && 
    "_type" in value && 
    value._type === "ErrorCondition"
  ) ? true : false;
}
