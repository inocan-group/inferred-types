/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { AnyFunction, IfNotError, FnMeta } from "..";

/**
 * **ToFn**`<T>`
 * 
 * Ensures that resultant type is a function, where the mapping is:
 * 
 *  - `AnyFunction` - function signature maintained
 *  - `FnMeta` - is converted to a precise function type
 *  - Any non-function value -- _other than a bare `never` value or an 
 * `ErrorCondition`_ -- will be return as a function of the form `() => T`
 * 
 * **Related:** `AsFn`
 */
export type ToFn<T> = IfNotError<
  T,
  T extends AnyFunction
    ? T
    : T extends FnMeta<infer Args, infer Returns, infer Props>
      ? "no-props" extends Props
        ? (...args: Args) => Returns
        : ((...args: Args) => Returns) & Props
  : () => T
>;

