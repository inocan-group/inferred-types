/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AsFnMeta, 
  Narrowable, 
  AnyFunction,
  AnyObject,
  ObjectKey,
  FnProps,
  RemoveFnProps,
  EmptyObject,
  RemoveIndexKeys,
  ToFn
} from "src/types/index";


type Returns<TFn extends AnyFunction, TProps extends AnyObject> = 
TProps extends EmptyObject
  ? TFn
  : ToFn<AsFnMeta<RemoveFnProps<TFn> & RemoveIndexKeys<FnProps<TFn> & TProps>>>;

/**
 * **FnReadyForProps**(props)
 * 
 * This type is the result of a partial application of the `createFnWithProps()`
 * utility and is expecting a dictionary of key/value pairs that will be combined
 * with the function which was already provided.
 */
export type FnReadyForProps<
  TFn extends AnyFunction
> = <
  TProps extends Record<ObjectKey, N>,
  N extends Narrowable
>(props: TProps) => Returns<TFn, TProps>;



const finalize = <
  TFn extends <TArgs extends readonly Narrowable[]>(...args: TArgs) => unknown,
>(fn: TFn): FnReadyForProps<TFn> => <
  TProps extends Record<ObjectKey, N>,
  N extends Narrowable
>(props: TProps) => {
  const clone = <
    A extends AsFnMeta<TFn>["args"]
  >(...args:  A) => fn(...(args as A & readonly any[]));

  for (const k of Object.keys(fn)) {    
    (clone as any)[k] = fn[k as keyof typeof fn];
  }

  for (const k of Object.keys(props)) {    
    (clone as any)[k] = props[k as keyof typeof props];
  }
  
  return clone as unknown as Returns<TFn, TProps>;
};

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
export const createFnWithProps = <
  TFn extends <TArgs extends readonly Narrowable[]>(...args: TArgs) => unknown
>(fn: TFn ) => finalize(fn);


