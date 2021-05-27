/* eslint-disable no-use-before-define */
import { entries } from "./index";
import { Transformer } from "~/types";

/**
 * Takes a dictionary of type `I` and converts it to a dictionary of type `O` where
 * they _keys_ used in both dictionaries are the same.
 *
 * The _transform_ function passed in must be able to recieve the full input object
 * and key, and then return expected value of `O` for
 */
export function dictionaryTransform<
  I extends object,
  O extends { [U in keyof I]: any },
  K extends keyof I & keyof O
>(i: I, transform: Transformer<I, O, K>) {
  const result = {} as any;

  for (const [key, value] of entries(i)) {
    result[key] = transform(value as I[K], key as K);
  }

  return result as O;
}
