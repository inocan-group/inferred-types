/* eslint-disable @typescript-eslint/ban-types */
import type { AnyFunction, IfEqual, FnMeta, FnProps, EmptyObject, IndexableObject } from "src/types/index";

/**
 * **AsFnMeta**`<TFn>`
 * 
 * Takes a function `TFn` and returns the meta information in `FnMeta`
 * format.
 */
export type AsFnMeta<
  TFn extends AnyFunction
> = IfEqual<
  FnProps<TFn>, EmptyObject,
  FnMeta<Parameters<TFn>, ReturnType<TFn>, "no-props">,
  FnMeta<
    Parameters<TFn>, 
    ReturnType<TFn>, 
    FnProps<TFn> extends IndexableObject ? FnProps<TFn> : never
  >
>;
