import { AsDoneFn } from "src/types/boolean-logic"
import { hasKeys } from "./hasKeys"
import { isObject } from "./isObject"

/**
 * **isDoneFn**(val)
 * 
 * A type guard which checks whether the value passed in has a `done`
 * property which is a function.
 */
export const isDoneFn = <T>(val: T): val is AsDoneFn<T> => {
  return isObject(val) && hasKeys("done")(val) && typeof val.done === "function"
}
