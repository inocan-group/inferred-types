/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { AnyFunction, IfNotError, FnMeta } from "src/types/index";

/**
 * **ToFn**`<T>`
 * 
 * Ensures that resultant type is a function, where the mapping is:
 * 
 *  - `AnyFunction` - function signature maintained
 *  - `FnMeta` - is converted to a precise function type
 *  - `never` _or_ `ErrorCondition` - returned "as is"
 *  
 * All other values will return a function of the form `() => T`
 * 
 * **Related:** `AsFn`
 */
export type ToFn<T> = IfNotError<
  T,
  {},
  T extends AnyFunction
    ? T
    : T extends FnMeta<infer Args, infer Returns, infer Props>
      ? "no-props" extends Props
        ? (...args: Args) => Returns
        : ((...args: Args) => Returns) & Props
  : () => T
>;

