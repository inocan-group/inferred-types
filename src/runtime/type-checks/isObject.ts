import { FunctionType, Narrowable, Not } from "src/types";
import { IsObject } from "src/types/type-checks";

export type ObjectType = Not<Record<string, Narrowable>, FunctionType>;

/**
 * Detects whether the passed in `v` is of type "object" where an object
 * is defined to be a string keyed dictionary style object. This means that
 * arrays are excluded, as well as functions which also have properties hanging
 * off of them.
 */
export function isObject<T extends unknown>(i: T) {
  return (typeof i === "object" && i !== null && Array.isArray(i) === false) as IsObject<T>;
}
