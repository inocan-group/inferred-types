import { Narrowable, SimplifyObject, WithoutValue, AnyObject } from "src/types";
import { keys } from "./keys";

/**
 * **withoutValue**(obj,val, [extends|equals])
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
>(obj: TObj, val: TValue): SimplifyObject<WithoutValue<TValue, TObj>> => {
  const result: Record<any, any>  = {};
  for (const k of keys(obj)) {
    if (val !== obj[k as any]) {
      result[k as any] = obj[k as any];
    }
  }

  return result as SimplifyObject<WithoutValue<TValue, TObj>>;
};
