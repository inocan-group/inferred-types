import type { AnyObject, WithoutKeys } from "src/types";
import { keys } from "./keys";

/**
 * **withoutKeys**(obj,keys)
 * 
 * Reduces the key/value pairs in an object with the expressed
 * keys excluded.
 */
export const withoutKeys = <
  TObj extends AnyObject,
  TKeys extends readonly (string & keyof TObj)[]
>(
  dict: TObj, 
  ...exclude: TKeys
) => {
  let output: Record<string, any> = {};
  for (const k of keys(dict)) {
    output = exclude.includes(k)
      ? output
      : {
        ...output,
        [k]: dict[k]
      };
  }

  return output as WithoutKeys<TObj, TKeys> ;
};
