/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyObject, WithoutKeys } from "src/types";
import { hasIndex } from "../type-guards";
import { keys } from "./keys";

/**
 * **withoutKeys**(obj,keys)
 * 
 * Reduces the key/value pairs in an object with the expressed
 * keys excluded.
 */
export const withoutKeys = <
  TObj extends AnyObject,
  TKeys extends readonly (string | symbol)[]
>(
  dict: TObj, 
  ...exclude: TKeys
) => {
  let output: Record<string, any> = {};
  for (const k of keys(dict)) {
    output = exclude.includes(k)
      ? output
      : hasIndex(dict, k)
        ? 
        {
        ...output,
        [k]: dict[k as keyof TObj]
      }
      : output;
  }

  return output as WithoutKeys<TObj, TKeys>;
};
