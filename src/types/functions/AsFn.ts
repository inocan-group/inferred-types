/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { AnyFunction } from "../base-types";
import { IfEqual } from "../boolean-logic";
import { FnMeta } from "./FnMeta";
import { FnProps } from "./FnProps";

/**
 * **AsFn**`<T>`
 * 
 * Ensures that resultant type is a function, where the mapping is:
 * 
 *  - `AnyFunction` - is converted to as narrow a function type as possible
 *  - `FnMeta` - is converted to a precise function type
 *  - any other type is turned into a function which returns `T`
 * 
 * **Related:** `ToFn`
 */
export type AsFn<T> = T extends AnyFunction
  ? AsFn<FnMeta<
      Parameters<T>,
      ReturnType<T>,
      IfEqual<FnProps<T>, {}, "no-props", FnProps<T>>
    >>
  : T extends FnMeta<any,any,any>
    ? "no-props" extends  T["props"]
      ? (...args: T["args"]) => T["returns"]
      : ((...args: T["args"]) => T["returns"]) & T["props"]
: () => T;
