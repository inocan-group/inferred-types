import type { ShapeCallback, TypedFunction } from "inferred-types/types";
import type { HandleDoneFn } from "../../../types/src/functions/HandleDoneFn";
import { handleDoneFn } from "inferred-types/runtime";

type Api<
    F extends TypedFunction,
> = {
    kind: "wrapped-fn";
    fn: F;
    args: Parameters<F>;
    done(): ReturnType<F>;
};

type WrapperCallback<
    F extends TypedFunction
> = <TCb extends <T extends Api<F>>(api: T) => unknown>(cb: TCb) => HandleDoneFn<ReturnType<TCb>>;

/**
 * **wrapFn**`(fn) -> (cb) -> (...args) -> result`
 *
 * A higher order utility which wraps a function so
 * that inputs and outputs can be modified before
 * returning a result.
 *
 * Critically all type information needs to be preserved
 * throughout the process. Call sequence:
 *
 * 1. **`fn`** - provide the function to be wrapped
 * 2. **`callback`**
 *     - the callback function will get a `CallBackApi` dictionary
 *       passed to it and can then return whatever it likes.
 *     - if the return type is the `CallBackApi` dictionary then
 *       it will return the internal, wrapped functions result
 *     - the API surface is:
 *          - `kind`: an identifier; always literal string `wrapped-fn`
 *          - `fn`: the underlying/wrapped function
 *          - `args`: the arguments passed in by caller
 * 3. **`parameters`**
 *     - now we should be presenting a function with the SAME argument
 *       as the wrapped function
 *     - upon receiving these parameters we will call the callback
 */
export function wrapFn<
    const F extends TypedFunction,
>(
    fn: F,
) {
    return <CB extends WrapperCallback<F>>(cb: CB) => {
        return <I extends Parameters<F>>(...args: I) => {
            const payload = {
                kind: "wrapper-fn",
                fn: () => fn,
                args: () => args,
                done() {
                    return fn(...args);
                }
            };
            const outcome = cb(payload);

            return handleDoneFn(outcome, true);
        };
    };
}

// DUMMY IMPLEMENTATION ILLUSTRATING STRUCTURE
const c: ShapeCallback = null as unknown as ShapeCallback;
const o = c(a => a.array("Array<boolean>"));
