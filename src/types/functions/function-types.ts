
import { IsEmptyObject } from "../boolean-logic";
import { Narrowable } from "../Narrowable";

/**
 * **FnWithDict**
 * 
 * Represents any function which is intersected with a given dictionary key/value.
 * 
 * **Related**: `SimpleFn`, `NarrowableFn`, `AnyFunction`, `IsFunctionWithDict`
 */
export type FnWithDict<
  TDict extends Record<string, any>,
> = IsEmptyObject<TDict> extends true
  ? never
  : (<TArgs extends any[]>(...args: TArgs) => any) & TDict;

/**
 * **BaseFunction**
 * 
 * Represents any _simple_ function which has any number of arguments and returns
 * anything. It does **not**, however match on a function which has been combined
 * with a dictionary of key/values.
 * 
 * **Note:** _you can optionally use the generic `A` to narrow the parameters you're
 * matching for and similarly you can use `R` to limit the return._
 * 
 * **Related:** `FnWithDict`, `NarrowableFn`, `AnyFunction`
 */
export type BaseFunction<
  A extends any[] = any[], 
  R extends any = any
> = (...args: A) => R & {};

/**
 * **NarrowableFn**
 * 
 * Very similar to `BaseFunction` but where the base function's provide narrowing
 * characteristics.
 */
export type NarrowableFn<
  A extends any[] = any[], 
  R extends Narrowable = Narrowable
> = <AA extends A>(...args: AA) => R & {};


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
  TProps extends {} = Record<string, any>,
  TArgs extends any[] = any[],
  TReturn extends any = any
> = <A extends TArgs>(...args: A) => TReturn & TProps;

export type IdentityFunction = <T>(val: T) => T;
