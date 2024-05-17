/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyFunction } from "../base-types";

/**
 * **LiteralFn**`<TFn>`
 * 
 * Receives any function `TFn` and makes sure that it is not using
 * generics to narrow the inputs coming into the function.
 * 
 * **Related:** `IsLiteralFn`, `NarrowingFn`
 */
export type LiteralFn<
  TFn extends AnyFunction
> = TFn extends ((...args: any[]) => any)
? (...args: Parameters<TFn>) => ReturnType<TFn>
: false;
