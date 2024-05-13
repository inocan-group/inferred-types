import { ErrorCondition } from "src/types/index";
import { isObject } from "./isObject";


/**
 * **isErrorCondition**(value)
 * 
 * Type guard which checks whether the given value is a `ErrorCondition` type.
 */
export function isErrorCondition<
  TKind extends string,
  T extends ErrorCondition<TKind>
>(value: unknown | T): value is T {
  return (
    isObject(value) && 
    "_type" in value && 
    value._type === "ErrorCondition"
  ) ? true : false;
}
