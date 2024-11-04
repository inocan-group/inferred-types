import {
  FnWithProps,
  Narrowable,
  TypedFunction
} from "@inferred-types/types";

/**
 * **addFnToProps**(props, [clone]) => (fn) => FnWithProps
 *
 * A higher order function which takes
 *
 * - `props` - key/value pairs to add to the a _future_ function
 * - `clone` - optionally state whether you want to use the future function's
 * type "as is" or you want to purify it's props with a clone (default is `true`)
 *
 * This is partially applied to reveal a function which takes a
 * function as input.
 */
export const addFnToProps = <
  K extends string,
  N extends Narrowable,
  TProps extends Record<K,N>,
  TClone extends boolean | undefined

>(props: TProps, _clone_fn?: TClone) =>
<
  TFn extends TypedFunction
>(fn: TFn) => {

    const localFn: any =  <T extends Readonly<Parameters<TFn>>>(...args: T) => fn(args);

    for (const k in props) {
      localFn[k] = props[k];
    }

    return localFn as FnWithProps<TFn,TProps,TClone>;

  };

  // export const narrowFn = <
  //   TFn extends AnyFunction
  // >(fn: TFn) => <TArgs extends AsFnMeta<TFn>["args"]>(...args: TArgs) => <R extends AsFnMeta<TFn>["returns"]>(fn(args): R) =>  ;
