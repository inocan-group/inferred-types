import { AnyFunction, Narrowable } from "src/types";
import { keys } from "src/runtime/dictionary";
/**
 * **createFnWithProps**(fn, params)
 * 
 * Creates a function with a dictionary of key/value pairs.
 */
export function createFnWithProps<
  TFn extends AnyFunction, 
  TParams extends Narrowable
>(fn: TFn, props: TParams & Record<string, any>) {
  const combinedProps = Array.from(new Set([...keys(fn),...keys(props)]));

  if (combinedProps.length === 0) {
    throw new Error(`Can't create FN with Props; no parameters were found in the combined "fn" and "props"!`);
  }
  const combined: any = fn;

  for (const i of keys(props)) {
    combined[i] = props[i];
  }
  for (const i of keys(fn)) {
    combined[i] = fn[i];
  }

  return combined as unknown as TFn & TParams;
}

/**
 * Adds a dictionary of key/value pairs to a function.
 */
export function fnWithProps<A extends any[], R extends any, P extends {}>(fn: ((...args: A) => R), props: P) {
  // eslint-disable-next-line prefer-const
  let combined: any = fn;
  for (const prop of keys(props)) {
    combined[prop] = props[prop];
  }
  return combined as ((...args: A) => R) & P;
}

/**
 * Adds read-only (and narrowly typed) key/value pairs to a function
 */
export function readonlyFnWithProps<A extends any[], R extends any, N extends Narrowable, P extends Record<keyof P, N>>(fn: ((...args: A) => R), props: P) {
  // eslint-disable-next-line prefer-const
  let combined: any = fn;
  for (const prop of keys(props)) {
    combined[prop] = props[prop];
  }
  return combined as ((...args: A) => R) & Readonly<P>;
}
