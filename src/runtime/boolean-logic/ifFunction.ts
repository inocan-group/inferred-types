import {
  AnyFunction,
  Narrowable,
  If,
  IsFunction
} from "inferred-types/dist/types/index";


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
): If<IsFunction<TValue>, Fn, NotFn> {
  return (
    typeof value === "function"
      ? isFnCallback(value)
      : notFnCallback(value as any)
  ) as unknown as If<IsFunction<TValue>, Fn, NotFn>;
}
