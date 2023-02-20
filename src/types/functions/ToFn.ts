/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { AnyFunction } from "../base-types";
import { IfEqual } from "../boolean-logic";
import { FnMeta } from "./FnMeta";
import { FnProps } from "./FnProps";

/**
 * **ToFn**`<T>`
 * 
 * Ensures that resultant type is a function, where the mapping is:
 * 
 *  - `AnyFunction` - is converted to as narrow a function type as possible
 *  - `FnMeta` - is converted to a precise function type
 *  - any other type is rejected as `never`
 * 
 * **Related:** `AsFn`
 */
export type ToFn<T> = T extends AnyFunction
  ? ToFn<FnMeta<
      Parameters<T>,
      ReturnType<T>,
      IfEqual<FnProps<T>, {}, "no-props", FnProps<T>>
    >>
  : T extends FnMeta<any,any,any>
    ? "no-props" extends  T["props"]
      ? (...args: T["args"]) => T["returns"]
      : ((...args: T["args"]) => T["returns"]) & T["props"]
: never;
