import {
  If,
  IsTrue,
  Narrowable,
  ObjectKey,
} from "@inferred-types/types";
import { isTrue } from "@inferred-types/runtime";


/**
 * **createFnWithProps**`(fn, props)`
 *
 * creates a strongly typed function along with properties.
 */
export const createFnWithProps = <
  TArgs extends readonly unknown[],
  TReturn extends Narrowable,
  N extends Narrowable,
  TProps extends Record<ObjectKey, N>,
  TNarrowing extends boolean = false
>(
  fn: (...args: TArgs) => TReturn,
  props: TProps,
  narrowing: TNarrowing = false as TNarrowing
) => {
  let fnWithProps: any = fn;
  for (let prop of Object.keys(props)) {
    fnWithProps[prop] = props[prop];
  }

  return (
    isTrue(narrowing)
      ? fnWithProps as (<A extends Readonly<TArgs>>(...args: A) => TReturn) & TProps
      : fnWithProps as ((...args: TArgs) => TReturn) & TProps
  ) as If<
    IsTrue<TNarrowing>,
    (<A extends TArgs>(...args: A) => TReturn) & TProps,
    ((...args: TArgs) => TReturn) & TProps
  >;
}
