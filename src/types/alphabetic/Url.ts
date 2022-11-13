import { AlphaNumeric, Ipv4, VariableName } from "./alpha-characters";

export type NetworkProtocol = "http" | "https" | "file" | "ws" | "wss";

/**
 * A literal variant of _string_ which is meant to represent a domain name
 * (e.g., `www.someplace.com`, etc.)
 */
export type DomainName =
  | `${AlphaNumeric}${string}.${AlphaNumeric}${string}`
  | `${AlphaNumeric}${string}.${AlphaNumeric}${string}.${string}`
  | `${AlphaNumeric}${string}.${AlphaNumeric}${string}.${string}.${string}`;

export type RelativeUrl = `${VariableName | "/"}`;

/**
 * A literal variant of _string_ which forces a string to follow conventions
 * for a fully qualified URL like `https://google.com`. It can't ensure the
 * type is fully valid but does help to avoid some typos.
 */
export type FullyQualifiedUrl = `${NetworkProtocol}://${Ipv4 | DomainName}/${string}`;

export type UrlBuilder =
  | (<P extends NetworkProtocol, D extends DomainName, B extends RelativeUrl>(
      protocol: P,
      domain: D,
      basePath: B
    ) => `${P}://${D}/${B}`)
  | (<U extends RelativeUrl>(url: U) => U);
