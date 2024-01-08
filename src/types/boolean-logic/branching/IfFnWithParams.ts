
import { IsFnWithParams } from "../..";


/**
 * **IfFnWithDict**`<T, IsFn, NotFn>`
 * 
 * Transforms type `T` to type `IsFn` if `T` is a function 
 * which also includes an intersection with a key/value
 * dictionary.
 * 
 * In all other cases it will transform to type `NotFn`.
 * 
 * **Related:** `IfFunction`, `IfFnWithoutDict`
 */
export type IfFnWithParams<
    T,
    IsFn,
    NotFn,
> = T extends IsFnWithParams<T> ? IsFn : NotFn;
