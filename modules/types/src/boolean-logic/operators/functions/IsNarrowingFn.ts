import type { AnyFunction, FnMeta, IsAny, IsStaticFn, Not, TypedFunction } from "inferred-types/types";

/**
 * **IsNarrowingFn**`<TFn>`
 *
 * A boolean operator which checks whether `TFn` uses generics
 * to narrow the input parameters. This is in contrast to a function
 * which takes literal types rather than _extending_ them.
 *
 * **Related:**
 * - `IsStaticFn`
 * - `NarrowingFn`, `StaticFn`
 */
export type IsNarrowingFn<TFn> = [IsAny<TFn>] extends [true]
    ? boolean
    : TFn extends AnyFunction
        ? TFn extends TypedFunction
            ? Not<IsStaticFn<TFn>> extends true
                ? FnMeta<TFn>["params"]["length"] extends 0
                    ? false
                    : true
                : false
            : Not<IsStaticFn<TFn>> extends true
                ? true  // Generic function (not TypedFunction) that's not static → narrowing
                : false
        : false;
