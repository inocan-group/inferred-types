import { FnShape } from "src/types";
import { First } from "src/types/First";

export interface Box<T> {
  value: T;
}

export interface FnBox<T extends Function> {
  value: T;
}

export type BoxValue<T extends Box<any>> = T extends Box<infer V> ? V : never;

export type BoxedFnParams<T extends Box<any>> = T extends Box<infer V>
  ? V extends (...args: infer A) => any
    ? A
    : []
  : [];

export type IsFnBox<T> = T extends FnBox<any> ? true : false;

/**
 * Allows a value with an inner-type to be boxed into a dictionary
 * so that this type inference is preserved.
 */
export function box<T>(value: T): Box<T> {
  const rtn = {
    value,
  };

  return rtn;
}

export function unbox<B extends Box<any>>(box: B) {
  const fn = <N extends First<BoxedFnParams<B>>>(v: N) =>
    box.value(v) as FnShape<[N], ReturnType<BoxValue<B>>>;
  const scalar = box.value;

  const value: B extends FnBox<BoxValue<B>> ? typeof fn : typeof scalar =
    typeof box.value === "function" ? fn : scalar;

  return value;
}
