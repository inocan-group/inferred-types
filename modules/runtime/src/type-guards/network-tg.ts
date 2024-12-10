import type {
  AsString,
  DomainName,
  GetUrlProtocolPrefix,
  GetUrlSource,
  Ip4Address,
  Ip6AddressLoose,
  UrlPath,
} from "inferred-types/types";
import {
  asChars,
  getUrlQueryParams,
  ip6GroupExpansion,
  isAlpha,
  isHexadecimal,
  isNumberLike,
  removeUrlProtocol,
} from "inferred-types/runtime";
import { isString } from "./isString";

/**
 * **isIp4Address**`(val)`
 *
 * Type guard which checks whether the value is a valid IPv4 address.
 */
export function isIp4Address<T>(val: T): val is T & Ip4Address {
  return isString(val)
    && (val.split(".").length === 4)
    && (val.split(".").every(i => isNumberLike(i)))
    && val.split(".").every(i => Number(i) >= 0 && Number(i) <= 255);
}

/**
 * **isIp6Address**`(val)`
 *
 * Type guard which checks whether the value is a valid IPv6 address.
 */
export function isIp6Address<T>(val: T): val is T & Ip6AddressLoose {
  const expanded = isString(val)
    ? ip6GroupExpansion(val)
    : "";
  return isString(val) && isString(expanded)
    && (expanded.split(":").every(i => asChars(i).length >= 1 && asChars(i).length <= 4))
    && expanded.split(":").every(i => isHexadecimal(i));
}

/**
 * **isIpAddress**`(val)`
 *
 * Type guard which checks whether the value is a valid IP address (v4 or v6).
 */
export function isIpAddress<T>(val: T): val is T & (Ip4Address | Ip6AddressLoose) {
  return isIp4Address(val) || isIp6Address(val);
}

/**
 * **hasUrlPort**`(val)`
 *
 * Type guard which tests whether there is an explicit _port_ reference
 * in the passed in URL (versus implicitly using the default port of the
 * protocol)
 */
export function hasUrlPort<T>(val: T): val is T & `${GetUrlProtocolPrefix<T>}${GetUrlSource<AsString<T>>}:${number}${string}` {
  return isString(val) && asChars(removeUrlProtocol(val)).includes(":");
}

/**
 * **isUrlPath**`(val)`
 *
 * Type guard which checks whether the value is a valid `UrlPath`
 */
export function isUrlPath<T>(val: T): val is T & UrlPath {
  return isString(val)
    && (val === "" || val.startsWith("/"))
    && (
      asChars(val).every(
        c => isAlpha(c)
          || isNumberLike(c)
          || c === "_"
          || c === "@"
          || c === "."
          || c === "-",
      )
    );
}

/**
 * **isDomainName**`(val)`
 *
 * Type guard which checks whether the value is a valid DNS domain name
 */
export function isDomainName<T>(val: T): val is T & DomainName<AsString<T>> {
  return isString(val)
    && val.split(".").filter(i => i).length > 1
    && isString(val.split(".").filter(i => i).pop())
    && asChars(val.split(".").filter(i => i).pop() as string).length > 1
    && val.split(".").filter(i => i).every(
      i => isAlpha(i) || isNumberLike(i) || i === "-" || i === "_",
    );
}

/**
 * **isUrlSource**`(val)`
 *
 * Type guard which checks whether the value is a valid URL source
 * (aka, an IP address or a Domain Name)
 */
export function isUrlSource<T>(val: T) {
  return isDomainName(val) || isIpAddress(val);
}

/**
 * **hasUrlQueryParameter**`(val,prop)`
 *
 * Tests whether the valued in has a query parameter specified by `prop`.
 */
export function hasUrlQueryParameter<T extends string, P extends string>(val: T, prop: P) {
  return isString(getUrlQueryParams(val, prop));
}
