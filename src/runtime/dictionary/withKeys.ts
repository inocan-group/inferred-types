import type { AnyObject, Key, WithKeys } from "src/types";

/**
 * **withKeys**(obj,keys)
 * 
 * Reduces the key/value pairs in an object to those keys
 * explicitly stated.
 */
export const withKeys = <
  TObj extends AnyObject,
  TKeys extends readonly (Key & keyof TObj)[]
>(
  dict: TObj, 
  ...keys: TKeys
): WithKeys<TObj, TKeys> => {
  let output: Record<string, unknown> = {};
  for (const k of keys) {
    output = {
      ...output,
      [k]: dict[k]
    };
  }

  return output as WithKeys<TObj, TKeys>;
};
