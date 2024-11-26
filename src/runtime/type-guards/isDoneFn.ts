import { AsDoneFn } from "inferred-types/types"
import { hasKeys } from "inferred-types/runtime"

/**
 * **isDoneFn**(val)
 *
 * A type guard which checks whether the value passed in has a `done`
 * property which is a function.
 */
export const isDoneFn = <T>(val: T): val is AsDoneFn<T> => {


  return hasKeys("done")(val) && typeof (val as any).done === "function"
}
