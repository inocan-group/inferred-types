import type { Narrowable, NarrowObject } from "inferred-types/types";
import { omit } from "inferred-types/runtime";

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
export function withoutKeys<
  TObj extends NarrowObject<N>,
  N extends Narrowable,
  TKeys extends readonly (string & keyof TObj)[],
>(dict: TObj, ...exclude: TKeys) {
  return omit(dict, ...exclude);
}
