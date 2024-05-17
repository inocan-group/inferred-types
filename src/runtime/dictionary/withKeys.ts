/* eslint-disable no-use-before-define */
import type { Dictionary, Narrowable, ObjectKey } from "src/types/index";
import { retain } from "./retain";


/**
 * **withKeys**(obj,keys)
 * 
 * Reduces the key/value pairs in an object to those keys
 * explicitly stated.
 * 
 * - note: this function is an alias for `retain()`
 */
export const withKeys = <
  TObj extends Dictionary<string | symbol, N>,
  N extends Narrowable,
  TKeys extends readonly (ObjectKey & keyof TObj)[]
>(
  dict: TObj, 
  ...keys: TKeys
) => retain(dict, ...keys);
 
