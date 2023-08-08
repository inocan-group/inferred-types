import { AnyFunction } from "src/types";

/**
 * **Returns**`<TFn,TExpected>`
 * 
 * Boolean type utility which detects whether `TFn` is a function
 * and _extends_ `TExpected` in it's return type.
 */
export type Returns<
  TFn,
  TExpected
> = TFn extends AnyFunction
  ? ReturnType<TFn> extends TExpected
    ? true
    : false
  : false;
