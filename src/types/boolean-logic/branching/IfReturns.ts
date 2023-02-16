import { AnyFunction } from "../base-types/AnyFunction";


/**
 * **IfReturns**`<TFn,TExpected,IF,ELSE>`
 * 
 * Type branching utility which returns `IF` when `TFn` is a function _and_
 * the function's return type extends `TExpected`.
 */
export type IfReturns<TFn, TExpected, IF, ELSE> = TFn extends AnyFunction
  ? ReturnType<TFn> extends TExpected
    ? IF
    : ELSE
  : never;
