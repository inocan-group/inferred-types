import type { ToJson,  Narrowable, NarrowObject, Scalar } from "inferred-types/types";


/**
 * **toJSON**`(val)`
 *
 * Converts a string value to a strongly typed JSON value
 *
 * **Related:** `jsonValues()`
 */
export function toJSON<
  T extends Exclude<Scalar, Symbol> | NarrowObject<N> | readonly N[],
  N extends Narrowable
>(val: T): ToJson<T> {
  return JSON.stringify(val) as ToJson<T>
}

