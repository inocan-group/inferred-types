import type { Dictionary, Narrowable, ObjectKey } from "inferred-types/types";
import { retain } from "./retain";

/**
 * **withKeys**(obj,keys)
 *
 * Reduces the key/value pairs in an object to those keys
 * explicitly stated.
 *
 * - note: this function is an alias for `retain()`
 */
export function withKeys<
  TObj extends Dictionary<string | symbol, N>,
  N extends Narrowable,
  TKeys extends readonly (ObjectKey & keyof TObj)[],
>(dict: TObj, ...keys: TKeys) {
  return retain(dict, ...keys);
}
