import type { IsStaticFn, Not, TypedFunction } from "inferred-types/types";

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
export type IsNarrowingFn<TFn> = TFn extends TypedFunction
    ? Not<IsStaticFn<TFn>>
    : false;
