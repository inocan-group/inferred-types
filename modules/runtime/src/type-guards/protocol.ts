import { isString } from "inferred-types/runtime";
import { NETWORK_PROTOCOL } from "inferred-types/constants";
import { NetworkProtocol, NetworkProtocolPrefix, Protocol, ProtocolPrefix } from "inferred-types/types";


/**
 * **hasProtocol**`(val)`
 *
 * Type guard which validates that `val` _starts with_ a known
 * protocol name (e.g., "https", "ftp", etc.).
 */
export function hasProtocol<
  P  extends readonly NetworkProtocol[]
>(
  val: unknown,
  ...protocols: P
): val is P["length"] extends 0
? `${NetworkProtocol}${string}`
: `${P[number]}${string}` {
  return (
    isString(val) &&
    protocols.length === 0
      ? NETWORK_PROTOCOL.some(i => val.startsWith(i))
      : protocols.some(i => (val as string).startsWith(i))
  )
}

/**
 * **isProtocol**`(val)`
 *
 * Type guard which validates that `val` is a known
 * protocol name (e.g., "https", "ftp", etc.).
 */
export function isProtocol<
  P  extends readonly NetworkProtocol[]
>(
val: unknown,
...protocols: P
): val is P["length"] extends 0
? NetworkProtocol
: P[number] {
  return (
    isString(val) &&
    protocols.length === 0
    ? NETWORK_PROTOCOL.some(i => val === i)
    : protocols.some(i => val === i)
  )
}



/**
 * **hasProtocolPrefix**`(val, [...protocols])`
 *
 * Type guard which validates that `val` _starts with_ a known
 * protocol name (e.g., "https", "ftp", etc.) followed by `://`.
 */
export function hasProtocolPrefix<
  P extends readonly NetworkProtocol[]
>(
  val: unknown,
  ...protocols: P
): val is P["length"] extends 0
  ? `${NetworkProtocolPrefix}${string}`
  : `${NetworkProtocolPrefix<P[number]>}${string}` {
  return (
    isString(val) &&
    protocols.length === 0
    ? NETWORK_PROTOCOL.map(i => `${i}://`).some(i => val.startsWith(i))
    : protocols.map(i => `${i}://`).some(i => (val as string).startsWith(i))
  )
}

/**
 * **isProtocolPrefix**`(val, [...protocols])`
 *
 * Type guard which validates that `val` is a known
 * protocol name (e.g., "https", "ftp", etc.) followed by `://`.
 */
export function isProtocolPrefix<
  P  extends readonly NetworkProtocol[]
>(
  val: unknown,
  ...protocols: P
): val is P["length"] extends 0
? NetworkProtocolPrefix
: NetworkProtocolPrefix<P[number]> {
  return (
    isString(val) &&
    protocols.length === 0
    ? NETWORK_PROTOCOL.map(i => `${i}://`).some(i => val === i)
    : protocols.map(i => `${i}://`).some(i => val === i)
  )
}

