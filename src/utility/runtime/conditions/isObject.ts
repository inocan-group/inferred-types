import { FunctionType, Mutable, Narrowable, Not } from "~/types";

export type IsObject<T> = Mutable<T> extends Record<string, any>
  ? // an object of some type
    T extends FunctionType
    ? // when a function with props is found, categorize as a function not object
      false
    : Mutable<T> extends any[]
    ? // Array's are objects too but in our narrower definition we're looking only
      // dictionary based arrays.
      false
    : true
  : false;

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
