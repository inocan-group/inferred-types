/* eslint-disable no-use-before-define */
import { keys } from "~/utility/keys";
import { SameKeys, Transformer } from "~/types";

/**
 * Takes a dictionary of type `I` and converts it to a dictionary of type `O` where
 * they _keys_ used in both dictionaries are the same.
 *
 * The _transform_ function passed in must be able to recieve the full input object
 * and key, and then return expected value of `O` for the given key.
 */
export function dictionaryTransform<I extends object, O extends SameKeys<I>>(
  input: I,
  transform: Transformer<I, O>
) {

  return keys(input).reduce((acc, i) => {
    const key = i as string & keyof I;
    return {...acc, [key]: transform(input, key)};
  }, {} as O);
}
