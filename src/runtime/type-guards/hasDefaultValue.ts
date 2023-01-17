import { NoDefaultValue } from "src/types/constants/NoDefaultValue";
import { isObject, isRef } from "src/runtime/type-guards";
import { IfRef } from "src/types/boolean-logic/IfRef";
import { Narrowable } from "src/types";
import { isSpecificConstant } from "./isConstant";
/**
 * **hasDefaultValue**(value)
 * 
 * Type guard which helps to eliminate the use case where a value which _might_ be a
 * `DefaultValue` is _not_ in this initial state and therefore indicating that the value
 * **is** in fact a default value.
 * 
 * Probably a better way to phrase this. :)
 */
export function hasDefaultValue<T extends Narrowable>(value: T): value is Exclude<T, NoDefaultValue> {
  const noDefault = isSpecificConstant("no-default-value");
  return noDefault(value) ? false : true;
}
