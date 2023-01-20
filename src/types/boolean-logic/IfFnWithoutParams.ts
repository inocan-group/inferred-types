import { BaseFunction } from "../functions/function-types";
import { Narrowable } from "../Narrowable";
import { IsFnWithParams } from "./IsFnWithParams";

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
    FnWithDict extends Narrowable = T,
    NotFn extends Narrowable = BaseFunction & T,
> = T extends IsFnWithParams<T> ? FnWithDict : NotFn;
