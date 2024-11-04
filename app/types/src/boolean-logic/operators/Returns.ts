import {  TypedFunction } from "src/types/index";

/**
 * **Returns**`<TFn,TExpected>`
 * 
 * Boolean type utility which detects whether `TFn` is a function
 * and _extends_ `TExpected` in it's return type.
 */
export type Returns<
  TFn,
  TExpected
> = TFn extends TypedFunction
  ? ReturnType<TFn> extends TExpected
    ? true
    : false
  : false;
