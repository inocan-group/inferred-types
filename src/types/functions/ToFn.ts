/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { AnyFunction, IfEqual , IfNotError, FnMeta, FnProps } from "src/types";

/**
 * **ToFn**`<T>`
 * 
 * Ensures that resultant type is a function, where the mapping is:
 * 
 *  - `AnyFunction` - is converted to as narrow a function type as possible
 *  - `FnMeta` - is converted to a precise function type
 *  - Any non-function value -- _other than a bare `never` value or an 
 * `ErrorCondition`_ -- will be return as a function of the form `() => T`
 * 
 * **Related:** `AsFn`
 */
export type ToFn<T> = IfNotError<
  T,
  T extends AnyFunction
    ? ToFn<FnMeta<
        Parameters<T>,
        ReturnType<T>,
        IfEqual<FnProps<T>, {}, "no-props", FnProps<T>>
      >>
    : T extends FnMeta<any,any,any>
      ? "no-props" extends  T["props"]
        ? (...args: T["args"]) => T["returns"]
        : ((...args: T["args"]) => T["returns"]) & T["props"]
  : () => T
>;
