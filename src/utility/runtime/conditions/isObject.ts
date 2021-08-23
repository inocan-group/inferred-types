import { FunctionType } from "~/types";

export type IsObject<T> = T extends {}
  ? // an object of some type
    T extends FunctionType
    ? // when a function with props is found, categorize as a function not object
      false
    : true
  : false;

export function isObject<T>(i: T) {
  return (typeof i === "object" && i !== null && Array.isArray(i) === false) as IsObject<T>;
}
