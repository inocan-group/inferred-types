import { isString, valuesOf } from "src/runtime/index";
import { NETWORK_PROTOCOL_LOOKUP } from "inferred-types";
import { Keys,TupleToUnion,  NetworkProtocol, Uri  } from "src/types/index";

/**
 * **isUri**`(val, ...protocols)`
 *
 * Type guard to test with the passed in value is a valid URI.
 *
 * **Note:** by default all protocols in `NetworkProtocol` are
 * considered valid but you can scope this down by setting which
 * protocols you explicitly interested in.
 *
 * **Related:** `isUrl`
 */
export const isUri = <
  T,
  P extends readonly NetworkProtocol[]
>(val: T, ...protocols: P): val is T & Uri<
  Keys<P>["length"] extends 0
  ? NetworkProtocol
  : TupleToUnion<P>
> => {
  const p = protocols.length === 0
    ? valuesOf(NETWORK_PROTOCOL_LOOKUP).flat().filter(i => i)
    : protocols;

  return isString(val) && p.some(i => val.startsWith(`${i}://`))
}


/**
 * **isUrl**`(val,[...protocols])`
 *
 * Type guard to test with the passed in value is a http/https URL.
 *
 * **Note:** you _can_ specify precisely which network protocols you
 * are wanting to test for but by default it is "http" and "https"
 *
 * **Related:** `isUri`
 */
export const isUrl = <
T,
P extends readonly NetworkProtocol[]
>(val: T, ...protocols: P): val is T & Uri<
  Keys<P>["length"] extends 0
  ? "http" | "https"
  : P[number]
> => {
const p = protocols.length === 0
  ? ["http", "https"]
  : protocols;

  return isString(val) && p.some(i => val.startsWith(`${i}://`))
}
