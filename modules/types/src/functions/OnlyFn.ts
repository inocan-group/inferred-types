import type { AnyFunction, FnMeta, TypedFunction } from "inferred-types/types";

/**
 * **OnlyFn**`<T>`
 *
 * Takes a function `T` and strips away any key/value pair that may
 * be tied to it, leaving only the function.
 */
export type OnlyFn<T extends AnyFunction> = T extends TypedFunction
? (...args: FnMeta<T>["params"][]) => FnMeta<T>["returns"]
: Function;

