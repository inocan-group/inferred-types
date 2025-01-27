import type { AsObject, EnsureKeys } from "inferred-types/types";
import { isFunction } from "./isFunction";
import { isObject } from "./isObject";

/**
 * **hasKeys**(props) => (obj) => `HasKeys<O,P>`
 *
 * Higher order type guard which on first call generates
 * a type guard that can test for the existence of the
 * properties passed into this first call.
 *
 * ```ts
 * const hasFooBar = hasKeys("foo", "bar"); // type guard
 * const hasFooBarToo = hasKeys({foo: 1, bar: 1});
 * ```
 */
export function hasKeys<
  P extends readonly string[] | [Record<string, unknown>],
>(...props: P) {
  return <
    T,
  >(val: T): val is T & ([EnsureKeys<AsObject<T>, ["name"]>] extends never[]
    ? never
    : EnsureKeys<AsObject<T>, P>) => {
    const keys = Array.isArray(props)
      ? props
      : Object.keys(props).filter(i => typeof i === "string") as string[];

    return !!((
      isFunction(val) || isObject(val)
    ) && keys.every(k => k in (val as object)));
  };
}
