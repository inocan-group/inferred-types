import { Narrowable } from "../literals/Narrowable";
import { IsFnWithParams } from "./IsFnWithParams";


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
    IsFn extends Narrowable,
    NotFn extends Narrowable,
> = T extends IsFnWithParams<T> ? IsFn : NotFn;
