import type { AnyObject, WithKeys } from "../../types";

/**
 * **withKeys**(obj,keys)
 * 
 * Reduces the key/value pairs in an object to those keys
 * explicitly stated.
 */
export const withKeys = <
  TObj extends AnyObject,
  TKeys extends readonly (string  & keyof TObj)[]
>(
  dict: TObj, 
  ...keys: TKeys
): WithKeys<TObj, TKeys> => {
  let output: Record<string, any> = {};
  for (const k of keys) {
    output = {
      ...output,
      [k]: dict[k]
    };
  }

  return output as WithKeys<TObj, TKeys>;
};
