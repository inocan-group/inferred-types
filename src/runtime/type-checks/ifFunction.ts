import { IfFunction } from "types/boolean-logic";
import { AnyFunction } from "types/functions";
import { Narrowable } from "types/literals/Narrowable";
import { isFunction } from "../type-guards/isFunction";

/**
 * **ifFunction**(value, isFn, notFn)
 * 
 * Runtime utility which assesses whether `value` is a function and provides
 * two callback hooks for both outcome.
 * 
 * **Related:** `isFunction`
 */
export function ifFunction<
  TValue extends Narrowable,
  Fn extends Narrowable,
  NotFn extends Narrowable
>(
  value: TValue, 
  isFnCallback: (fn: TValue & AnyFunction) => Fn, 
  notFnCallback: (payload: Exclude<TValue, AnyFunction>) => NotFn
): IfFunction<TValue, Fn, NotFn> {
  return (
    isFunction(value)
    ? isFnCallback(value)
    : notFnCallback(value as any)
  ) as IfFunction<TValue, Fn, NotFn>;
}
