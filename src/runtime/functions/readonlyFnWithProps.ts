import { AnyObject } from "src/types";

/**
 * Adds read-only (and narrowly typed) key/value pairs to a function
 */
export function readonlyFnWithProps<
  A extends readonly unknown[], 
  R, 
  P extends AnyObject
>(fn: ((...args: A) => R), props: P) {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const combined: any = fn;
  for (const prop of Object.keys(props)) {
    combined[prop] = props[prop as keyof P];
  }
  return combined as ((...args: A) => R) & Readonly<P>;
}
