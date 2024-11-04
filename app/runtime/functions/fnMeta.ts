import { AnyFunction,  AsFnMeta } from "src/types/index";

type _Props<TFn extends AnyFunction> = AsFnMeta<TFn>["props"];

/**
 * **fnMeta**(func)
 * 
 * Runtime utility which provides a `fn` and `props` property which are
 * decomposed from the input function.
 * 
 * - the `fn` is a clone of the underlying function
 */
export const fnMeta = <TFn extends AnyFunction>(func: TFn) => {
  const fn = <
    A extends AsFnMeta<TFn>["args"]
  >(...args:  A) => func(...args);

  const props = Object.keys(fn).reduce(
    (acc, key) => ({...acc, [key]: fn[key as keyof typeof fn] }),
    {} as Record<PropertyKey, unknown>, 
  ) as _Props<TFn>;

  return {
    fn,
    props
  };
};
