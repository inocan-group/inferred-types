import { AnyObject } from "../boolean-logic";
import { IsEmptyObject } from "../boolean-logic/IsEmptyObject";
import { Narrowable } from "../literals/Narrowable";

/**
 * **FnWithDict**
 * 
 * Represents any function which is intersected with a given dictionary key/value.
 * 
 * **Related**: `SimpleFn`, `NarrowableFn`, `AnyFunction`, `IsFunctionWithDict`
 */
export type FnWithDict<
  TDict extends AnyObject,
> = IsEmptyObject<TDict> extends true
  ? never
  : (<TArgs extends unknown[]>(...args: TArgs) => unknown) & TDict;


/**
 * **NarrowableFn**
 * 
 * Very similar to `BaseFunction` but where the base function's provide narrowing
 * characteristics.
 */
export type NarrowableFn<
  A extends any[] = any[], 
  R extends Narrowable = Narrowable
> = <AA extends A>(...args: AA) => R;


/**
 * **AnyFunction**`<[TProps], [TArgs]>`
 * 
 * A type which is meant to match on _all_ types of functions which can exist.
 * This includes basic functions as well as functions which have KeyValue dictionaries
 * in intersection with them.
 * 
 * **Note:** _you may optionally limit the types you are matching by using any of of 
 * the optional generics provided_
 * 
 * **Related:** `SimpleFn`, `NarrowableFn`, `FnWithDict`
 */
export type AnyFunction<
  TArgs extends any[] = any[],
  TReturn = any
> = (...args: TArgs) => TReturn;

export type IdentityFunction = <T>(val: T) => T;
