/* eslint-disable no-use-before-define */
import type {  Narrowable } from "src/types";
import { omit } from "./omit";

/**
 * **withoutKeys**(obj,...keys)
 * 
 * Reduces the key/value pairs in an object with the expressed
 * keys excluded.
 * 
 * - this is an alias to the `omit()` utility 
 * 
 * **Related**: `omit`, `createOmission`
 */
export const withoutKeys = <
  TObj extends Record<string|symbol, N>,
  N extends Narrowable,
  TKeys extends readonly (string & keyof TObj)[]
>(
  dict: TObj, 
  ...exclude: TKeys
) => omit(dict, ...exclude);
