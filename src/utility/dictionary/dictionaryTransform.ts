/* eslint-disable no-use-before-define */
import { SameKeys, Transformer } from "~/types";
import { kv } from "native-dash";

/**
 * Takes a dictionary of type `I` and converts it to a dictionary of type `O` where
 * they _keys_ used in both dictionaries are the same.
 *
 * The _transform_ function passed in must be able to recieve the full input object
 * and key, and then return expected value of `O` for the given key.
 */
export function dictionaryTransform<I extends object, O extends SameKeys<I>>(
  i: I,
  transform: Transformer<I, O>
) {
  const result = {} as any;
  for (const pair of kv(i)) {
    result[pair.key] = transform(i, pair.key);
  }

  return result as O;
}
