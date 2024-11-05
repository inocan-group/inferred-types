import { AsDoneFn } from "inferred-types/dist/types/index"
import { hasKeys } from "src/runtime/index"

/**
 * **isDoneFn**(val)
 *
 * A type guard which checks whether the value passed in has a `done`
 * property which is a function.
 */
export const isDoneFn = <T>(val: T): val is AsDoneFn<T> => {


  return hasKeys("done")(val) && typeof (val as any).done === "function"
}
