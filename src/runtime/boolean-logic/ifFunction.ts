import { IfFunction, AnyFunction, Narrowable } from "src/types/index";
import { isFunction } from "src/runtime/index";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : notFnCallback(value as any)
  ) as IfFunction<TValue, Fn, NotFn>;
}
