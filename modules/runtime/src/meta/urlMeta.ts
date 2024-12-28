import type {
  NUMERIC_CHAR,
} from "inferred-types/constants";
import type {
  GetUrlDynamics,
  GetUrlPath,
  GetUrlPort,
  GetUrlProtocol,
  GetUrlQueryParams,
  GetUrlSource,
  IsIp4Address,
  IsIp6Address,
  IsIpAddress,
  IsUrl,
  NetworkProtocol,
} from "inferred-types/types";
import {
  NETWORK_PROTOCOL_LOOKUP,
  Never,
  PROTOCOL_DEFAULT_PORTS,
} from "inferred-types/constants";
import {
  ensureLeading,
  hasOverlappingKeys,
  hasProtocol,
  infer,
  isCsv,
  isDomainName,
  isIp4Address,
  isIp6Address,
  isIpAddress,
  isNumberLike,
  isUrl,
  isVariable,
  stripAfter,
  stripBefore,
  stripLeading,
  stripTrailing,
} from "inferred-types/runtime";

export interface UrlMeta<T> {
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

export function getUrlProtocol<
  T extends string,
>(url: T) {
  const proto = PROTOCOLS.find(p => url.startsWith(`${p}://`));

  return proto as GetUrlProtocol<T>;
}

export function removeUrlProtocol<T extends string>(url: T) {
  return stripBefore(url, "://");
}

function ensurePath(val: string) {
  const val2 = ensureLeading(val, "/");

  return val === ""
    ? ""
    : stripTrailing(val2, "/");
}

export function getUrlPath<
  T extends string,
>(url: T) {
  return isUrl(url)
    ? ensurePath(
      stripAfter(stripBefore(removeUrlProtocol(url), "/"), "?"),
    ) as unknown as GetUrlPath<T>
    : Never;
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
export function getUrlQueryParams<
  T extends string,
  S extends string | undefined,
>(url: T, specific: S = undefined as S) {
  const qp = stripBefore(url, "?");
  if (specific) {
    return (
      qp.includes(`${specific}=`)
        ? decodeURIComponent(
            stripAfter(
              stripBefore(qp, (`${specific}=`)),
              "&",
            ).replace(/\+/g, "%20"),
          )
        : undefined
    );
  }

  return (
    qp === ""
      ? qp
      : `?${qp}`
  ) as GetUrlQueryParams<T, S>;
}

/**
 * **getUrlDefaultPort**`(url)`
 *
 * Returns the default port which the given URL string would use
 * based on the protocol detected in this string.
 */
export function getUrlDefaultPort<T extends string>(url: T) {
  const proto = getUrlProtocol(url);
  return proto in PROTOCOL_DEFAULT_PORTS
    ? PROTOCOL_DEFAULT_PORTS[proto as keyof typeof PROTOCOL_DEFAULT_PORTS]
    : null as never;
}

const _numeric = null as unknown as typeof NUMERIC_CHAR[number];

/**
 * **getUrlPort**`(url, [resolve])`
 *
 * Find the URL port specified in the passed in URL.
 *
 * - return "default" if no explicit url was expressed
 * - if you set `resolve` to **true** it will resolve URL's which
 * don't explicitly state their port to
 */
export function getUrlPort<
  T extends string,
  R extends boolean,
>(
  url: T,
  resolve: R = false as R,
): GetUrlPort<T, R> {
  const re = /.*:(\d{2,3})/;
  const match = url.match(re);

  return (
    re.test(url) && match && isNumberLike(Array.from(match)[1])
      ? Number(Array.from(match)[1])
      : resolve
        ? getUrlDefaultPort(url)
        : hasProtocol(url)
          ? `default`
          : null as never
  ) as unknown as GetUrlPort<T, R>;
}

/**
 * **getUrlSource**`(url)`
 *
 * Extracts the `source` part of the url.
 *
 * - this is the DNS name if DNS is used
 * - or an IP address
 */
export function getUrlSource<
  T extends string,
>(url: T) {
  const candidate = stripAfter(stripAfter(stripAfter(removeUrlProtocol(url), "/"), "?"), ":") as unknown;

  return (
    isIpAddress(candidate) || isDomainName(candidate)
      ? candidate
      : Never
  ) as unknown as GetUrlSource<T>;
}

export function getUrlBase<
  T extends string,
>(url: T) {
  const path = getUrlPath(url);
  const remaining = stripAfter(url, path);

  return remaining as `${GetUrlProtocol<T>}://${GetUrlSource<T>}`;
};

export function getUrlDynamics<T extends string>(
  url: T,
): GetUrlDynamics<T> {
  const path = getUrlPath(url);
  const qp = getUrlQueryParams(url) as `?${string}`;

  const pathParts = path.startsWith("<")
    ? path.split("<").map(i => ensureLeading(i, "<"))
    : path.split("<").map(i => ensureLeading(i, "<")).slice(1);

  const segmentTypes = [
    "string",
    "number",
    "boolean",
    "Opt<string>",
    "Opt<number>",
    "Opt<boolean>",
  ];

  const pathVars: Record<string, string> = {};
  const findPathTyped = infer(`<{{infer name}} as {{infer type}}>`);
  const findPathUnion = infer(`<{{infer name}} as string({{infer union}})>`);
  const findPathNamed = infer(`<{{infer name}}>`);
  for (const part of pathParts) {
    const union = findPathUnion(part as string);
    const typed = findPathTyped(part as string);
    const named = findPathNamed(part as string);
    if (union) {
      if (isVariable(union.name) && isCsv(union.union)) {
        pathVars[union.name] = `string(${union.union})`;
      }
    }
    else if (
      typed
      && segmentTypes.includes(typed.type)
      && isVariable(typed.name)
    ) {
      pathVars[typed.name] = typed.type;
    }
    else if (
      named
      && isVariable(named.name)
    ) {
      pathVars[named.name] = "string";
    }
  }

  const qpVars: Record<string, string> = {};
  const qpParts = stripLeading(qp, "?").split("&");

  for (const p of qpParts) {
    const union = infer(`{{infer var}}=<string({{infer params}})>`)(p);
    const dynamic = infer(`{{infer var}}=<{{infer val}}>`)(p);
    const fixed = infer(`{{infer var}}={{infer val}}`)(p);

    if (
      union
      && isVariable(union.var)
      && isCsv(union.params)
    ) {
      qpVars[union.var] = `string(${union.params})`;
    }
    else if (
      dynamic
      && isVariable(dynamic.var)
      && segmentTypes.includes(dynamic.val)
    ) {
      qpVars[dynamic.var] = dynamic.val;
    }
    else if (
      fixed
      && isVariable(fixed.var)
    ) {
      qpVars[fixed.var] = fixed.val;
    }
  }

  return {
    pathVars,
    qpVars,
    allVars: hasOverlappingKeys(pathVars, qpVars)
      ? null
      : {
          ...pathVars,
          ...qpVars,
        },
  } as unknown as GetUrlDynamics<T>;
}

/**
 * **urlMeta**`(url)`
 *
 * Analyzes the string passed in and provides a small dictionary of
 * metadata properties about the URL.
 */
export function urlMeta<
  T extends string,
>(
  url: T,
) {
  return {
    url,
    isUrl: isUrl(url) as IsUrl<T>,
    protocol: getUrlProtocol(url) as GetUrlProtocol<T>,
    path: getUrlPath(url) as GetUrlPath<T>,
    queryParameters: getUrlQueryParams(url),
    params: getUrlDynamics<T>,
    port: getUrlPort(url),
    source: getUrlSource(url) as GetUrlSource<T>,
    isIpAddress: isIpAddress(getUrlSource(url) as string) as IsIpAddress<GetUrlSource<T>>,
    isIp4Address: isIp4Address(getUrlSource(url) as string) as IsIp4Address<GetUrlSource<T>>,
    isIp6Address: isIp6Address(getUrlSource(url)) as IsIp6Address<GetUrlSource<T>>,
  };
}
