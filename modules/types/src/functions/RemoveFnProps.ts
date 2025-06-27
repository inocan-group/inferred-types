import type { AnyFunction, AsFnMeta } from "inferred-types/types";

/**
 * **RemoveFnProps**`<T>`
 *
 * Takes a function `T` and returns the function unchanged but without any
 * key/value pairs that may have been added to the function's definition.
 */
export type RemoveFnProps<
    T extends AnyFunction,
> = (...args: AsFnMeta<T>["params"]) => AsFnMeta<T>["returns"];
