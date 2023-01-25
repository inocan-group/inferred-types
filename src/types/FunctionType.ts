
import {  IsEqual } from "..";
import { Narrowable } from "./literals/Narrowable";

/**
 * **FunctionType**
 *
 * Provides a way to correctly match for regular functions _and_ functions which
 * also have a dictionary hash alongside the root function.
 *
 * - without the generic `T` specified it simply matches correctly on both plain functions as well as functions which also have properties on them (this is consistent to how runtime's `typeof` operator works)
 * - with the generic you can specify the shape of the key/values
 */
export type FunctionType<T extends {}> = {} extends T
  ? Function | (Function & { [key: string]: any })
  : Function | (Function & T);


/**
 * **FnShape**
 *
 * A type strong way of expressing a function's shape, where 
 * 
 * - `TParams` represents the parameters of the function
 * - `TReturn` is the return value
 * ` `TProps` are any props that may hang off the function as well
 * 
 */
export type FnShape<
  TParams extends readonly any[] = any[], 
  TReturn extends Narrowable = any,
  // TODO: don't think this is working
  TProps extends {} = {}
> = IsEqual<TProps, {}> extends true
  ?  (...args: TParams) => TReturn
  : ((...args: TParams) => TReturn) & TProps;


