import {
  IsUrl,
  GetUrlProtocol,
  GetUrlSource,
  GetUrlPath,
  GetUrlQueryParams,
  NetworkProtocol,
  GetUrlPort,
  IsIpAddress,
  IsIp4Address,
  IsIp6Address
} from "src/types/index";
import {
  isUrl,
  isIp4Address,
  isIp6Address,
  isIpAddress,
  stripAfter,
  stripBefore,
  ensureLeading,
  stripTrailing,
  isDomainName,
  takeNumericCharacters,
} from "src/runtime/index";
import { NETWORK_PROTOCOL_LOOKUP } from "src/constants/NetworkConstants";
import { Never } from "inferred-types";


export type UrlMeta<T> = {
  /** the URL passed in */
  url: T;
  /** boolean flag indicating whether the value passed in is considered a valid URL */
  isUrl: IsUrl<T>;
  /** the `NetworkProtocol` used in the URL */
  protocol: GetUrlProtocol<T>;
  path: T extends string ? GetUrlPath<T> : never;
  queryParams: T extends string ? GetUrlQueryParams<T> : never;
  /** the port number -- when stated explicitly -- or "default" */
  port: GetUrlPort<T>;


  /** either the domain name or the IP address */
  source: T extends string
    ? GetUrlSource<T>
    : never;
  /**
   * Boolean flag which indicates that the _source_ is an IP address (vs. Domain Name)
   */
  isIpAddress: IsIpAddress<T>;
  /**
   * Boolean flag indicating the _source_ is a IPv4 IP address
   */
  isIpV4Address: IsIp4Address<T>;

  /**
   * Boolean flag indicating the _source_ is a IPv6 IP address
   */
  isIpV6Address: IsIp6Address<T>;
}

const PROTOCOLS = Object.values(NETWORK_PROTOCOL_LOOKUP).flat().filter(i => i !== "") as NetworkProtocol[];


export const getUrlProtocol = <
  T extends string
>(
  url: T
) => {
  const proto = PROTOCOLS.find(p => url.startsWith(`${p}://`));

  return proto as GetUrlProtocol<T>;
}

export const removeUrlProtocol = <T extends string>(url: T) => {
  return stripBefore(url, "://")
}

const ensurePath = (val: string) => {
  const val2 = ensureLeading(val, "/");

  return val === ""
  ? ""
  : stripTrailing(val2, "/");
}

export const getUrlPath = <
  T extends string
>(
  url: T
) => {
  return isUrl(url)
    ? ensurePath(
        stripAfter(stripBefore(removeUrlProtocol(url), "/"), "?")
      ) as unknown as GetUrlPath<T>
    : Never
}

/**
 * **getUrlQueryParams**`(url, [specific])`
 *
 * Get's the query parameter's part of a URL and optionally allows
 * you to focus in on a specific key in the query parameters.
 *
 * If you do specify a particular query parameter it will decode
 * the value with URIDecode.
 */
export const getUrlQueryParams = <
  T extends string,
  S extends string | undefined
>(
  url: T,
  specific: S = undefined as S
) => {
  const qp = stripBefore(url, "?");
  if (specific) {
    return (
      qp.includes(`${specific}=`)
        ? decodeURIComponent(
            stripAfter(
              stripBefore(qp, (`${specific}=`)),
              "&"
            ).replace(/\+/g, "%20")
          )
        : undefined
    )
  }

  return (
    qp === ""
    ? qp
    : `?${qp}`
  ) as GetUrlQueryParams<T,S>;
}

export const getUrlPort = <
  T extends string
>(
  url: T
) => {
  const candidate = takeNumericCharacters(
    stripBefore(removeUrlProtocol(url), ":")
  );
  return (
    candidate === ""
      ? "default"
      : Number(candidate)
  )
}

export const getUrlSource = <
  T extends string,
>(
  url: T
) => {
  const candidate = stripAfter(stripAfter(stripAfter(removeUrlProtocol(url), "/"), "?") , ":") as unknown;

  return (
    isIpAddress(candidate) || isDomainName(candidate)
    ? candidate
    : Never
  ) as unknown as GetUrlSource<T>;
}


/**
 * **urlMeta**`(url)`
 *
 * Analyzes the string passed in and provides a small dictionary of
 * metadata properties about the URL.
 */
export const urlMeta = <
  T extends string
>(url: T) => {
  return {
    url,
    isUrl: isUrl(url) as IsUrl<T> ,
    protocol: getUrlProtocol(url) as GetUrlProtocol<T>,
    path: getUrlPath(url) as GetUrlPath<T>,
    queryParameters: getUrlQueryParams(url),
    port: getUrlPort(url) as GetUrlPort<T>,
    source: getUrlSource(url) as GetUrlSource<T>,
    isIpAddress: isIpAddress(getUrlSource(url)) as IsIpAddress<GetUrlSource<T>>,
    isIp4Address: isIp4Address(getUrlSource(url)) as IsIp4Address<GetUrlSource<T>>,
    isIp6Address: isIp6Address(getUrlSource(url)) as IsIp6Address<GetUrlSource<T>>,
  }

}
