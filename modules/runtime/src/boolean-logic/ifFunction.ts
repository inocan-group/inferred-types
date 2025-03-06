import type {
    IsFunction,
    Narrowable,
    TypedFunction,
} from "inferred-types/types";
import { isFunction } from "inferred-types/runtime";

/**
 * **ifFunction**(value, isFn, notFn)
 *
 * Runtime utility which assesses whether `value` is a function and provides
 * two callback hooks for both outcome.
 *
 * **Related:** `isFunction`
 */
export function ifFunction<
    TValue extends Narrowable | TypedFunction,
    Fn extends Narrowable,
    NotFn extends Narrowable,
>(
    value: TValue,
    isFnCallback: (fn: TValue & TypedFunction) => Fn,
    notFnCallback: (payload: Exclude<TValue, TypedFunction>) => NotFn,
) {
    return (
        isFunction(value)
            ? isFnCallback(value)
            : notFnCallback(value as any)
    ) as unknown as IsFunction<TValue> extends true ? Fn : NotFn;
}
