import type { HandleDoneFn } from "inferred-types/types";
import { isDictionary, isFunction } from "inferred-types/runtime";

type HandleDoneFnReturn<TVal, TBareFn extends boolean> =
    TVal extends { done: (...args: never[]) => unknown }
        ? HandleDoneFn<TVal>
        : TBareFn extends true
            ? HandleDoneFn<TVal>
            : TVal;

type DoneFnContainer = {
    done: () => unknown;
};

type Callable = (...args: never[]) => unknown;

function hasDoneFn(val: unknown): val is DoneFnContainer {
    return isDictionary(val) && "done" in val && typeof val.done === "function";
}

/**
 * **handleDoneFn**(val, [bare_fn])
 *
 * Looks at the value passed in and if it's an object with
 * a property `done` which is a function it will call it;
 * otherwise it will proxy the value through.
 *
 * If you wish to also detect a bare function and have it
 * call that too, you can set the `call_bare_fn` to **true**.
 */
export function handleDoneFn<
    TVal,
    TBareFn extends boolean,
>(val: TVal, call_bare_fn: TBareFn = false as TBareFn): HandleDoneFnReturn<TVal, TBareFn> {
    return (
        hasDoneFn(val)
            ? val.done()
            : isFunction(val) && call_bare_fn
                ? (val as Callable)()
                : val
    ) as HandleDoneFnReturn<TVal, TBareFn>;
}
