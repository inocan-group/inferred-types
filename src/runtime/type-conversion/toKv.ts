/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToKV, AnyObject } from "src/types";
import { keysOf } from "../dictionary";
import { reverse } from "../lists/reverse";

/**
 * **toKv**(obj)
 * 
 * Converts an object to a type strong array of `KV` values.
 * 
 * **Related**: `fromKv`
 */
export const toKv = <
  TObj extends AnyObject
>(obj: TObj) => {
  // typically the reverse order is more intuitive for people
  const props = reverse(keysOf(obj));
  return [...props].reduce(
    (acc, key) => [...acc, [ "KV", key, obj[key as any] ]],
    [] as any[]
  ) as ToKV<TObj, typeof props>;
};
