import { DomainName } from "./DomainName";
import { Ip4Address } from "./IpAddress";
import { VariableChar } from "./Variable";


export type NetworkProtocol = "http" | "https" | "file" | "ws" | "wss";


export type RelativeUrl = `${VariableChar | "/"}`;

/**
 * A literal variant of _string_ which forces a string to follow conventions
 * for a fully qualified URL like `https://google.com`. It can't ensure the
 * type is fully valid but does help to avoid some typos.
 */
export type FullyQualifiedUrl = `${NetworkProtocol}://${Ip4Address | DomainName}/${string}`;

export type UrlBuilder =
  | (<P extends NetworkProtocol, D extends DomainName, B extends RelativeUrl>(
    protocol: P,
    domain: D,
    basePath: B
  ) => `${P}://${D}/${B}`)
  | (<U extends RelativeUrl>(url: U) => U);


export type Uri = `${NetworkProtocol}://${string}`;
