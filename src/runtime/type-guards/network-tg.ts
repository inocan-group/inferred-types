import { DomainName, GetUrlProtocolPrefix, GetUrlSource, Ip4Address, Ip6AddressLoose, UrlPath } from "src/types/index"
import { asChars } from "../type-conversion/asChars"
import { isAlpha } from "./isAlpha"
import { isNumericString } from "./isNumericString"
import { isString } from "./isString"
import { AsString } from "src/types/type-conversion/AsString"
import { ip6GroupExpansion } from "../type-conversion"
import { isHexadecimal } from "./isHexadecimal"
import { removeUrlProtocol } from "../meta"




/**
 * **isIp4Address**`(val)`
 *
 * Type guard which checks whether the value is a valid IPv4 address.
 */
export const isIp4Address = <T>(val: T): val is T & Ip4Address => {
  return isString(val) &&
    ( val.split(".").length === 4) &&
    ( val.split(".").every(i => isNumericString(i))) &&
    val.split(".").every(i => Number(i)>= 0 && Number(i)<= 255)
}

/**
 * **isIp6Address**`(val)`
 *
 * Type guard which checks whether the value is a valid IPv6 address.
 */
export const isIp6Address = <T>(val: T): val is T & Ip6AddressLoose => {
  const expanded = isString(val)
  ? ip6GroupExpansion(val)
  : "";
  return isString(val) && isString(expanded) &&
    ( expanded.split(":").every(i => asChars(i).length >= 1 && asChars(i).length <= 4) ) &&
    expanded.split(":").every(i => isHexadecimal(i))
}

/**
 * **isIpAddress**`(val)`
 *
 * Type guard which checks whether the value is a valid IP address (v4 or v6).
 */
export const isIpAddress = <T>(val: T): val is T & (Ip4Address | Ip6AddressLoose) => {
  return isIp4Address(val) || isIp6Address(val);
}

/**
 * **hasUrlPort**`(val)`
 *
 * Type guard which tests whether there is an explicit _port_ reference
 * in the passed in URL (versus implicitly using the default port of the
 * protocol)
 */
export const hasUrlPort = <T>(val: T): val is T & `${GetUrlProtocolPrefix<T>}${GetUrlSource<AsString<T>>}:${number}${string}` => {
  return isString(val) && asChars(removeUrlProtocol(val)).some(i => i === ":");
}

/**
 * **isUrlPath**`(val)`
 *
 * Type guard which checks whether the value is a valid `UrlPath`
 */
export const isUrlPath = <T>(val: T): val is T & UrlPath => {
  return isString(val) &&
  ( val === "" || val.startsWith("/") ) &&
  (
    asChars(val).every(
      c => isAlpha(c) ||
      isNumericString(c) ||
      c === "_" ||
      c === "@" ||
      c === "." ||
      c === "-"
    )
  )
}

/**
 * **isDomainName**`(val)`
 *
 * Type guard which checks whether the value is a valid DNS domain name
 */
export const isDomainName = <T>(val: T): val is T & DomainName<AsString<T>> => {
  return isString(val) &&
    val.split(".").filter(i => i).length > 1 &&
    isString(val.split(".").filter(i => i).pop()) &&
    asChars(val.split(".").filter(i => i).pop() as string).length > 1 &&
    val.split(".").filter(i => i).every(
      i => isAlpha(i) || isNumericString(i) || i === "-" || i === "_"
    )
}

/**
 * **isUrlSource**`(val)`
 *
 * Type guard which checks whether the value is a valid URL source
 * (aka, an IP address or a Domain Name)
 */
export const isUrlSource = <T>(val: T) => {
  return isDomainName(val) || isIpAddress(val);
}


