/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyFunction,  FnWithDict, Narrowable,  } from "src/types/index";

/**
 * **addPropsToFn**(fn, [clone]) => (props) => FnWithProps
 * 
 * A higher order function which takes a dictionary object and
 * then a function and combines them into a single type.
 */
export const addPropsToFn = <
  TFn extends AnyFunction, 
  TClone extends boolean | undefined
>(fn: TFn, clone_fn?: TClone) => {
    const localFn: any = clone_fn
      ? <T extends Parameters<TFn>>(...args: T) => fn(args)
      : fn;

    return <
      K extends PropertyKey,
      N extends Narrowable,
      TProps extends Record<K,N>
    >(obj: TProps) => {

      for (const k in obj) {
        localFn[k] = obj[k];
      }
      
      return localFn as FnWithDict<
        TFn,
        TProps,
        TClone
      >;

    };
};
