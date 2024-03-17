/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IfTrue,
  ObjectKey,
} from "src/types/index";
import { keysOf } from "../dictionary/keysOf";
import { isTrue } from "../type-guards/index";


/**
 * **createFnWithProps**(fn, props)
 * 
 * creates a strongly typed function along with properties.
 */
export const createFnWithProps = <
TArgs extends readonly unknown[],
TReturn,
TProps extends Record<ObjectKey, unknown>,
TNarrowing extends boolean = false
>(
  fn: (...args: TArgs) => TReturn, 
  props: TProps, 
  narrowing: TNarrowing = false as TNarrowing
) => {
  const fnWithProps: any = fn;
  for (const prop of keysOf(props)) {
    fnWithProps[prop] = props[prop];
  }

  return (
    isTrue(narrowing) 
    ? fnWithProps as (<A extends Readonly<TArgs>>(...args: A) => TReturn) & TProps
    : fnWithProps as ((...args: TArgs) => TReturn) & TProps
  ) as IfTrue<
    TNarrowing,
    (<A extends TArgs>(...args: A) => TReturn) & TProps,
    ((...args: TArgs) => TReturn) & TProps
  >;
}
