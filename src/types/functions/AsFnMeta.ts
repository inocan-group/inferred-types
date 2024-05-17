/* eslint-disable @typescript-eslint/ban-types */
import type { AnyFunction, FnMeta, FnProps, EmptyObject, IsEqual, If, ExpandRecursively } from "src/types/index";

/**
 * **AsFnMeta**`<TFn>`
 * 
 * Converts any function into `FnMeta` format.
 */
export type AsFnMeta<
  TFn extends AnyFunction
> = If<
  IsEqual<FnProps<TFn>, EmptyObject>,
  FnMeta<Parameters<TFn>, ReturnType<TFn>, never, TFn>,
  FnMeta<
    Parameters<TFn>, 
    ReturnType<TFn>, 
    ExpandRecursively<FnProps<TFn>>,
    TFn
  >
>;

