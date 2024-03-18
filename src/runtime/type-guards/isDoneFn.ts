import { AsDoneFn } from "src/types/boolean-logic"
import { hasKeys } from "./hasKeys"

/**
 * **isDoneFn**(val)
 * 
 * A type guard which checks whether the value passed in has a `done`
 * property which is a function.
 */
export const isDoneFn = <T>(val: T): val is AsDoneFn<T> => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return hasKeys("done")(val) && typeof (val as any).done === "function"
}
