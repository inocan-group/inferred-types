import { AnyObject } from "src/types";
import { keys } from "../dictionary";

/**
 * Adds read-only (and narrowly typed) key/value pairs to a function
 */
export function readonlyFnWithProps<
  A extends readonly unknown[], 
  R, 
  P extends AnyObject
>(fn: ((...args: A) => R), props: P) {
  // eslint-disable-next-line prefer-const
  let combined: any = fn;
  for (const prop of keys(props)) {
    combined[prop] = props[prop];
  }
  return combined as ((...args: A) => R) & Readonly<P>;
}
