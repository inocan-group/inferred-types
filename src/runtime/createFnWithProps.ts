import { Narrowable } from "../types/Narrowable";
import { keys } from "./keys";

export function createFnWithProps<F extends Function, P extends {}>(fn: F, props: P) {
  return (() => {
    // eslint-disable-next-line prefer-const
    let combined: any = fn;
    for (const prop of keys(props)) {
      combined[prop] = props[prop];
    }
    return combined;
  })() as unknown as F & P;
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
