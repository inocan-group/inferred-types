/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fn, FnMeta, Narrowable } from "src/types";
import { 
  AnyFunction,
  AnyObject,
  FnWithDict, 
} from "src/types/base-types";

/**
 * **FnReadyForProps**(props)
 * 
 * This type is the result of a partial application of the `createFnWithProps()`
 * utility and is expecting a dictionary of key/value pairs that will be combined
 * with the function which was already provided.
 */
export type FnReadyForProps<
  TFn extends FnMeta<any, any, any>
> = <
  TProps extends Record<PropertyKey, N>,
  N extends Narrowable
>(props: TProps) => _Returns<TFn, TProps>;

type _Returns<TFn extends FnMeta<any,any,any>, TProps extends AnyObject> = FnWithDict<
TFn["args"], 
TFn["returns"], 
TFn["props"] extends "no-props" 
  ? TProps 
  : TProps & TFn["props"]
>;

/**
 * **createFnWithProps**(fn)(params)
 * 
 * A higher order function which builds a type strong combination of
 * a function and a dictionary.
 * 
 * - The preliminary passed into the partial application of this utility
 * _can_ contain key/value pairs and they will be preserved
 * - Any keys which overlap between those on the
 * function and the dictionary passed into fully apply this utility will be
 * merged with the dictionary props will have precedence. 
 */
export const createFnWithProps = <TFn extends AnyFunction>(
  fn: TFn
) => <
  TProps extends Record<PropertyKey, N>,
  N extends Narrowable
>(props: TProps) => {
  for (const k of Object.keys(props)) {
    (fn as any)[k] = props[k as keyof TProps];
  }

  return fn as unknown as _Returns<Fn<TFn>, TProps>;
};
