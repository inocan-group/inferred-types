import {   HasKeys, IfNotNever, } from "src/types/index"
import { isObject } from "./isObject";

/**
 * **hasKeys**(props) => (obj) => `HasKeys<O,P>`
 * 
 * Higher order type guard which on first call generates
 * a type guard that can test for the existence of the 
 * properties passed into this first call.
 * 
 * ```ts
 * const hasFooBar = hasKeys(["foo", "bar"]); // type guard
 * const hasFooBarToo = hasKeys({foo: 1, bar: 1}); 
 * ```
 */
export const hasKeys = <
  P extends readonly string[] | [Record<string, unknown>]
>(...props: P) => 
/** 
 * Type guard which validates whether the configured properties 
 * exist on a given `Record<ObjectKey, unknown` and if they do at
 * runtime will provide the type support for them.
 */
<
  T
>(val: T): val is T & IfNotNever<HasKeys<T, ["name"], never>, HasKeys<T,P>>  => {
  const keys = Array.isArray(props) 
    ? props 
    : Object.keys(props).filter(i => typeof i === "string") as string[];
  

  return isObject(keys) && keys.every(k => k in (val as object)) ? true : false
}
