import { AnyFunction, FnWithDict, IndexableObject } from "src/types/base-types";

/**
 * **createFnWithProps**(fn, params)
 * 
 * Creates a function with a dictionary of key/value pairs.
 */
export function createFnWithProps<
  TFn extends AnyFunction,
  TParams extends IndexableObject
>(
  fn: TFn, 
  props: TParams
) {
  const combined = {...fn, ...props};
  const fn2: FnWithDict<any, any, any> = fn;

  for (const key of Object.keys(combined)) {
    fn2[key] = combined[key];
  }

  return fn2 as unknown as TFn & TParams;
}

