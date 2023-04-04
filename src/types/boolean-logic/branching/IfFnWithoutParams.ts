import { IsFnWithParams } from "src/types/boolean-logic";

// TODO: fix
type BaseFunction = unknown;

/**
 * **IfFnWithoutDict**`<T, IsFn, NotFn>`
 * 
 * Transforms type `T` to type `IsFn` if `T` is a function 
 * without including an intersection with a key/value
 * dictionary.
 * 
 * In all other cases it will transform to type `NotFn`.
 * 
 * **Related:** `IfFunction`, `IfFnWithDict`
 */
export type IfFnWithoutParams<
    T,
    FnWithDict = T,
    NotFn = BaseFunction & T,
> = T extends IsFnWithParams<T> ? FnWithDict : NotFn;
