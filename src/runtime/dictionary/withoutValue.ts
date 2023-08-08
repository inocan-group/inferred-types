/* eslint-disable @typescript-eslint/no-explicit-any */
import type { 
  Narrowable, 
  SimplifyObject, 
  AnyObject, 
  WithoutValue
} from "src/types";
import { keysOf } from "src/runtime";

/**
 * **withoutValue**(obj,val)
 * 
 * Runtime utility which reduces an object to only those properties which 
 * _do not have_ a particular value.
 * 
 * - You may also _optionally_ state explicitly certain props you want to 
 * exclude regardless of value.
 */
export const withoutValue = <
  TObj extends AnyObject,
  TValue extends Narrowable
>(obj: TObj, val: TValue): SimplifyObject<WithoutValue<TObj, TValue>> => {
  const result: Record<PropertyKey, unknown>  = {};

  for (const k of keysOf(obj)) {
    if (val !== obj[k as keyof typeof obj]) {
      result[k as any] = obj[k as keyof typeof obj];
    }
  }

  return result as SimplifyObject<WithoutValue<TObj, TValue>>;
};
