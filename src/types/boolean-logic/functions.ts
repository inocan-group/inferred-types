import { AnyFunction,  BaseFunction } from "../functions/function-types";
import { Narrowable } from "../Narrowable";
import { And } from "./And";
import { IfEquals } from "./equivalency";
import { IfExtends } from "./Extends";
import { IsEmptyObject } from "./object";
import { IfOr } from "./Or";

/**
 * **IsFunction**`<T>`
 * 
 * Checks whether `T` is a function of _any_ kind and that includes
 * functions with dictionary props sitting alongside the function.
 */
export type IsFunction<T> = T extends AnyFunction ? true : false;

/**
 * **IsFunctionWithDict**`<TFn, [TParamMatch]>`
 * 
 * Checks whether `T` is a function which also includes 
 * dictionary props sitting alongside the function.
 */
export type IsFunctionWithDict<
  TFn, 
  TParamMatch extends Record<string, any> | undefined = undefined
> = TFn extends AnyFunction
    ? IsEmptyObject<TFn> extends true 
        ? false 
        : // there are some props on TFn
          IfOr<
            [
                And<[
                    IfExtends<TParamMatch, Record<string, any>>, 
                    IfExtends<TFn, TParamMatch>
                ]>,
                IfEquals<TParamMatch, undefined>
            ],
            true,
            false
        >
    : false;
            

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
    IsFn extends Narrowable,
    NotFn extends Narrowable,
> = T extends AnyFunction ? IsFn : NotFn;

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
export type IfFnWithDict<
    T,
    IsFn extends Narrowable,
    NotFn extends Narrowable,
> = T extends IsFunctionWithDict<T> ? IsFn : NotFn;

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
export type IfFnWithoutDict<
    T,
    FnWithDict extends Narrowable = T,
    NotFn extends Narrowable = BaseFunction & T,
> = T extends IsFunctionWithDict<T> ? FnWithDict : NotFn;
