/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Fn, 
  FnMeta, 
  IntersectingKeys,  
  Narrowable, 
  WithoutKeys, 
  AnyFunction,
  AnyObject,
  Container,
  FnWithDict,
} from "src/types";


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
    : TFn["props"] extends Container
        ? TProps & WithoutKeys<
            TFn["props"], IntersectingKeys<TProps, TFn["props"]>
          >
        : TProps
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
): FnReadyForProps<Fn<TFn>> => (props) => {
  
  const clone = <
    A extends Fn<TFn>["args"]
  >(...args:  A) => fn(...args);

  for (const k of Object.keys(fn)) {    
    (clone as any)[k] = fn[k as keyof typeof fn];
  }

  for (const k of Object.keys(props)) {    
    (clone as any)[k] = props[k as keyof typeof props];
  }
  
  return clone as unknown as _Returns<Fn<TFn>, typeof props>;
};
