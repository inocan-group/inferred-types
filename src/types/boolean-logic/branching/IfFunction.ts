import { AnyFunction } from "src/types";

/**
 * **IfFunction**`<T, IsFn, NotFn>`
 * 
 * Transforms type `T` to type `IsFn` if `T` is _any_ type
 * of function including a function which is intersected with
 * a key/value dictionary.
 * 
 * In all other cases it will transform to type `NotFn`.
 * 
 * **Related:** `IfFnWithDict`, `IfFnWithoutDict`
 */
export type IfFunction<
    T,
    IsFn,
    NotFn,
> = T extends AnyFunction ? IsFn : NotFn;
