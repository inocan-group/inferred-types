/* eslint-disable no-use-before-define */
import type { Key, Narrowable } from "src/types";
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
  TObj extends Record<string|symbol, N>,
  N extends Narrowable,
  TKeys extends readonly (Key & keyof TObj)[]
>(
  dict: TObj, 
  ...keys: TKeys
) => retain(dict, ...keys);
 
